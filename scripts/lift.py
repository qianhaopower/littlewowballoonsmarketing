"""Lift balloon pieces out of everyday photos: a wall, a room, white on white.

For the photos scripts/cutout.py cannot handle. macOS only: the first pass is
the system's own subject lifting (the Vision framework, via scripts/lift.swift).
The outline is then tightened against the photo and finished like every other
cutout.

    pip install numpy scipy pillow opencv-python-headless
    python scripts/lift.py                 # every piece
    python scripts/lift.py blossom-staff   # just this one

After adding a photo, add a line to PIECES below, run the script, then copy the
printed width and height into src/content/pieces.ts. All coordinates are pixels
in the original photo.
"""

import os
import subprocess
import sys
import tempfile

import cv2
import numpy as np
from PIL import Image, ImageOps
from scipy import ndimage as ndi

from cutout import SRC, finish, save

HERE = os.path.dirname(os.path.abspath(__file__))

DEFAULTS = dict(
    tighten="colour",  # "colour": re-cut the outline by colour; "paper": peel white paper off white balloons
    band=10,           # how far, in pixels, the outline may move from the first pass
    keep=(),           # (x0, y0, x1, y1) boxes that are always part of the piece (white parts the first pass dropped)
    fill=(),           # (cx, cy, rx, ry) ellipses that are always part of the piece (white bubbles on a white wall)
    maybe=(),          # (cx, cy, rx, ry) ellipses around parts the first pass missed; the colour pass finds their outline
    peel=(),           # (x0, y0, x1, y1, test): inside the box, peel pixels that pass the test back from the outline
    fades=(),          # (x0, x1, y0, y1): between these columns, fade out from row y0 to y1 and drop what is below
)


def near(colour, tolerance):
    """Test for `peel`: pixels within `tolerance` of a colour, e.g. the shelf a piece stands on."""
    return lambda im: np.abs(im - np.array(colour)).max(2) <= tolerance


def brown(im):
    """Test for `peel`: shadowed wood, as it shows under a black balloon."""
    return (im[..., 0] - im[..., 2] >= 12) & (im[..., 0] >= 28)


# slug -> (original, overrides)
PIECES = {
    "mario-and-luigi": (
        "photos/mario-and-luigi.jpg",
        dict(
            # the white badge on the red cap; the gold bar between the shoes
            keep=((1560, 640, 1850, 760), (1510, 1552, 1655, 1618)),
            fill=((1992, 1212, 55, 66), (2018, 1330, 43, 32), (2110, 1300, 50, 46)),  # white glove, far right
            maybe=((1265, 942, 52, 44), (1335, 935, 40, 56)),  # two white glove bubbles behind the others
            peel=(
                (0, 1400, 2576, 1932, near((190, 159, 110), 32)),  # the plywood shelf they stand on
                (700, 1440, 1200, 1700, brown),  # and its shadow under the black shoes
            ),
        ),
    ),
    "blossom-staff": ("photos/blossom-staff.jpg", dict(fades=((0, 1932, 2180, 2330),))),  # the hand holding it
    "paw-wands": ("gallery/gallery-16.png", dict(tighten="paper", band=6)),
}


def first_pass(path):
    """The subject as macOS sees it."""
    with tempfile.TemporaryDirectory() as tmp:
        mask = os.path.join(tmp, "mask.png")
        subprocess.run(
            ["swift", os.path.join(HERE, "lift.swift"), path, mask], check=True, stdout=subprocess.DEVNULL
        )
        return np.asarray(Image.open(mask).convert("L")) > 127


def tighten_by_colour(im, subject, o):
    """Re-cut the outline inside a narrow band, by colour (GrabCut)."""
    band = o["band"]
    trimap = np.full(subject.shape, cv2.GC_BGD, np.uint8)
    trimap[ndi.distance_transform_edt(~subject) <= band] = cv2.GC_PR_BGD
    trimap[subject] = cv2.GC_PR_FGD
    if o["maybe"]:
        yy, xx = np.mgrid[0 : subject.shape[0], 0 : subject.shape[1]]
        for cx, cy, rx, ry in o["maybe"]:
            inside = (((xx - cx) / rx) ** 2 + ((yy - cy) / ry) ** 2) <= 1
            trimap[inside] = cv2.GC_PR_FGD
            trimap[ndi.binary_dilation(inside, iterations=band) & ~inside & ~subject] = cv2.GC_PR_BGD
    trimap[ndi.distance_transform_edt(subject) > band] = cv2.GC_FGD
    for x0, y0, x1, y1 in o["keep"]:
        trimap[y0:y1, x0:x1] = cv2.GC_FGD

    # Work on the piece and a margin of background, not the whole frame.
    ys, xs = np.nonzero(trimap != cv2.GC_BGD)
    y0, y1 = max(ys.min() - 80, 0), min(ys.max() + 80, subject.shape[0])
    x0, x1 = max(xs.min() - 80, 0), min(xs.max() + 80, subject.shape[1])
    window = np.ascontiguousarray(trimap[y0:y1, x0:x1])
    bgr = np.ascontiguousarray(im[y0:y1, x0:x1, ::-1].astype(np.uint8))
    cv2.setRNGSeed(0)
    cv2.grabCut(bgr, window, None, np.zeros((1, 65)), np.zeros((1, 65)), 4, cv2.GC_INIT_WITH_MASK)

    out = np.zeros_like(subject)
    out[y0:y1, x0:x1] = (window == cv2.GC_FGD) | (window == cv2.GC_PR_FGD)

    # White balloons against a pale wall: colour cannot tell them apart, so the first pass stands.
    white = (im.max(2) - im.min(2) <= 40) & (im.min(2) >= 110)
    out |= white & (ndi.distance_transform_edt(subject) > 3)
    return out


def peel(subject, backdrop, depth):
    """Peel backdrop-coloured pixels back from the outline, as far as `depth` pixels in."""
    rim = subject & (ndi.distance_transform_edt(subject) <= depth)
    outside = ndi.binary_propagation(~subject, mask=~subject | (rim & backdrop))
    return ~outside


def tighten_on_paper(im, subject, o):
    """White balloons on white paper: peel the paper back to the balloon's shaded rim."""
    band = o["band"]
    grown = ndi.distance_transform_edt(~subject) <= band
    return peel(grown, im.min(2) >= 253, 2 * band)


def outline(im, path, o, scale):
    """The piece as a mask: first pass, tightened, smoothed."""
    subject = first_pass(path)
    subject = (tighten_on_paper if o["tighten"] == "paper" else tighten_by_colour)(im, subject, o)
    for x0, y0, x1, y1, test in o["peel"]:
        backdrop = np.zeros_like(subject)
        backdrop[y0:y1, x0:x1] = test(im[y0:y1, x0:x1])
        subject = peel(subject, backdrop, 3 * o["band"])
    for x0, y0, x1, y1 in o["keep"]:
        subject[y0:y1, x0:x1] = True
    if o["fill"]:
        yy, xx = np.mgrid[0 : subject.shape[0], 0 : subject.shape[1]]
        for cx, cy, rx, ry in o["fill"]:
            subject |= (((xx - cx) / rx) ** 2 + ((yy - cy) / ry) ** 2) <= 1

    # Take the stair-steps off the outline and drop stray specks.
    subject = ndi.gaussian_filter(subject.astype(np.float32), 0.8 * scale) > 0.5
    parts, count = ndi.label(subject)
    if count > 1:
        sizes = ndi.sum(subject, parts, np.arange(1, count + 1))
        subject = np.isin(parts, 1 + np.flatnonzero(sizes >= 500 * scale * scale))
    return subject


def lift(path, **overrides):
    o = {**DEFAULTS, **overrides}
    im = np.asarray(ImageOps.exif_transpose(Image.open(path)).convert("RGB")).astype(np.int16)
    scale = max(1.0, max(im.shape[:2]) / 1100)
    subject = outline(im, path, o, scale)

    img = finish(im, subject, scale=scale, crop=False)

    if o["fades"]:
        px = np.asarray(img).copy()
        alpha = px[..., 3].astype(np.float32)
        rows = np.arange(px.shape[0], dtype=np.float32)[:, None]
        for x0, x1, y0, y1 in o["fades"]:
            k = np.clip((y1 - rows) / (y1 - y0), 0, 1)
            alpha[:, x0:x1] *= k * k * (3 - 2 * k)
        px[..., 3] = alpha.astype(np.uint8)
        img = Image.fromarray(px, "RGBA")

    return img.crop(img.getbbox())


def main():
    for slug in sys.argv[1:] or list(PIECES):
        source, overrides = PIECES[slug]
        save(lift(os.path.join(SRC, source), **overrides), slug)


if __name__ == "__main__":
    main()
