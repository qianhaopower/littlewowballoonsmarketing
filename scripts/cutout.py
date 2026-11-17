"""Cut balloon photos off a white studio background, ready for the dark site.

Reads the originals in assets/originals and writes transparent WebP cutouts to
public/pieces. Photos shot on white paper only; white balloons on white paper
cannot be separated and need a darker backdrop.

    pip install numpy scipy pillow
    python scripts/cutout.py            # every piece
    python scripts/cutout.py dog bear   # just these

After adding a photo, add a line to PIECES below, run the script, then copy the
printed width and height into src/content/pieces.ts.
"""

import os
import sys

import numpy as np
from PIL import Image
from scipy import ndimage as ndi

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "assets", "originals")
OUT = os.path.join(ROOT, "public", "pieces")

DEFAULTS = dict(
    bg_t=232,        # min(r, g, b) at or above this is paper white
    shadow_sat=14,   # neutral greys this unsaturated ...
    shadow_min=175,  # ... and this light are contact shadow, dropped with the paper
    floor=None,      # (from, sat, min): below `from` of the height, also drop tinted floor shadow
    hole_area=500,   # enclosed pure-white regions at least this big are see-through gaps
    protect=(),      # (cx, cy, rx, ry) ellipses in source pixels that are always kept (white parts)
    fade=None,       # (cx, cy, r0, r1) radial fade in crop fractions, for a limb leaving the frame
)

# slug -> (original, overrides)
PIECES = {
    "dog": ("gallery/gallery-03.png", dict(shadow_sat=46, shadow_min=200, floor=(0.80, 68, 145))),
    "bear": ("hero/hero-2.png", dict(shadow_sat=46, shadow_min=200, floor=(0.82, 62, 150))),
    "sword": ("gallery/gallery-02.png", dict(shadow_sat=46, shadow_min=200, floor=(0.90, 75, 110))),
    "four-petal-flower": ("hero/hero-3-v2.png", {}),
    "dinosaur": ("gallery/gallery-04.png", {}),
    "fish": ("gallery/gallery-05.png", dict(shadow_sat=46, shadow_min=200)),
    "rose": ("gallery/gallery-13.png", {}),
    "rainbow-lollipop": ("gallery/gallery-12.png", {}),
    "sceptre": ("gallery/gallery-07.png", {}),
    "bow-wand": ("gallery/gallery-14.png", {}),
    "wrist-corsage": ("gallery/gallery-08.png", dict(fade=(0.47, 0.30, 0.46, 0.60))),
    "octopus": ("gallery/gallery-09.png", dict(protect=((465, 413, 27, 27), (524, 411, 27, 28)))),
    "sphere-in-a-cube": ("gallery/gallery-06.png", {}),
    "lantern": ("gallery/gallery-15.png", {}),
    "spring": ("gallery/gallery-17.png", {}),
}


def cutout(path, **overrides):
    o = {**DEFAULTS, **overrides}
    im = np.asarray(Image.open(path).convert("RGB")).astype(np.int16)
    mn, mx = im.min(2), im.max(2)
    sat = mx - mn

    # Paper and its shadows, as far as they connect to the edge of the frame.
    paper_like = (mn >= o["bg_t"]) | ((sat <= o["shadow_sat"]) & (mn >= o["shadow_min"]))
    if o["floor"]:
        start, floor_sat, floor_min = o["floor"]
        rows = np.arange(im.shape[0])[:, None] >= int(start * im.shape[0])
        paper_like |= rows & (sat <= floor_sat) & (mn >= floor_min)
    labels, _ = ndi.label(paper_like)
    edge = np.unique(np.concatenate([labels[0], labels[-1], labels[:, 0], labels[:, -1]]))
    background = np.isin(labels, edge[edge > 0])

    # Gaps you can see the paper through, e.g. inside a loop.
    gap_like = (mn >= 247) & (sat <= 10) & ~background
    gap_labels, count = ndi.label(gap_like)
    gaps = np.zeros_like(background)
    if count:
        areas = ndi.sum(gap_like, gap_labels, np.arange(1, count + 1))
        gaps = np.isin(gap_labels, 1 + np.flatnonzero(areas >= o["hole_area"]))
        if gaps.any():
            gaps |= ndi.binary_dilation(gaps, iterations=8, mask=paper_like & ~background)

    removed = background | gaps
    if o["protect"]:
        yy, xx = np.mgrid[0 : removed.shape[0], 0 : removed.shape[1]]
        for cx, cy, rx, ry in o["protect"]:
            removed &= ~((((xx - cx) / rx) ** 2 + ((yy - cy) / ry) ** 2) <= 1)

    subject = ~removed
    parts, count = ndi.label(subject)
    if count > 1:  # drop stray specks
        sizes = ndi.sum(subject, parts, np.arange(1, count + 1))
        subject = np.isin(parts, 1 + np.flatnonzero(sizes >= 500))

    # Soft edge, pulled in by a pixel so no white fringe survives.
    depth = ndi.distance_transform_edt(subject)
    alpha = np.clip((depth - 1.0) / 1.3, 0, 1)

    # Paint the fringe with clean colour from just inside the edge.
    core = depth >= 4.0
    dist, nearest = ndi.distance_transform_edt(~core, return_indices=True)
    fringe = subject & ~core & (dist <= 6)
    rgb = im.copy()
    rgb[fringe] = im[nearest[0][fringe], nearest[1][fringe]]

    img = Image.fromarray(np.dstack([rgb.astype(np.uint8), (alpha * 255).astype(np.uint8)]), "RGBA")
    img = img.crop(img.getbbox())

    if o["fade"]:
        px = np.asarray(img).copy()
        h, w = px.shape[:2]
        cx, cy, r0, r1 = o["fade"]
        yy, xx = np.mgrid[0:h, 0:w]
        dist = np.hypot(xx / w - cx, (yy / h - cy) * h / w)
        k = np.clip((r1 - dist) / (r1 - r0), 0, 1)
        px[..., 3] = (px[..., 3] * k * k * (3 - 2 * k)).astype(np.uint8)
        img = Image.fromarray(px, "RGBA")
        img = img.crop(img.getbbox())

    return img


def main():
    slugs = sys.argv[1:] or list(PIECES)
    os.makedirs(OUT, exist_ok=True)
    for slug in slugs:
        source, overrides = PIECES[slug]
        img = cutout(os.path.join(SRC, source), **overrides)
        img.thumbnail((1100, 1100), Image.LANCZOS)
        img.save(os.path.join(OUT, slug + ".webp"), "WEBP", quality=93, method=6, alpha_quality=100)
        print(f"{slug}: width {img.width}, height {img.height}")


if __name__ == "__main__":
    main()
