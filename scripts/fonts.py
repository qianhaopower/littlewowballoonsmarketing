"""Build the site's own copies of its three typefaces, into src/fonts.

The site used to fetch its fonts from Google while building, and when that
fetch went wrong the whole deploy failed. The fonts now live in the repository
and the build needs nothing from outside.

    pip install fonttools brotli
    python scripts/fonts.py

Run it again after adding or changing a Chinese name (nameZh) in
src/content/pieces.ts: the Chinese font carries only the characters the site
uses, and a character it lacks falls back to whatever the visitor's device has.
"""

import os
import re
import tempfile
import urllib.request
from urllib.parse import quote

from fontTools.subset import Options, Subsetter
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "src", "fonts")
SOURCE = "https://raw.githubusercontent.com/google/fonts/main/ofl/"
CACHE = os.path.join(tempfile.gettempdir(), "little-wow-fonts")

# The Latin range Google Fonts serves as "latin": English, with its punctuation and symbols.
LATIN = (
    list(range(0x0000, 0x0100))
    + [0x0131, 0x0152, 0x0153, 0x02BB, 0x02BC, 0x02C6, 0x02DA, 0x02DC, 0x0304, 0x0308, 0x0329]
    + list(range(0x2000, 0x2070))
    + [0x20AC, 0x2122, 0x2191, 0x2193, 0x2212, 0x2215, 0xFEFF, 0xFFFD]
)

CJK = re.compile(r"[　-〿㐀-䶿一-鿿＀-￯]")


def chinese_in_use():
    """Every Chinese character that appears anywhere in the site's source."""
    found = set()
    for folder, _, files in os.walk(os.path.join(ROOT, "src")):
        for name in files:
            if name.endswith((".ts", ".tsx", ".css")):
                with open(os.path.join(folder, name), encoding="utf-8") as f:
                    found.update(CJK.findall(f.read()))
    return sorted(found)


# output name -> (upstream file, weight axis to keep, characters to keep)
FONTS = {
    "cormorant-garamond": ("cormorantgaramond/CormorantGaramond[wght].ttf", (300, 500), LATIN),
    "cormorant-garamond-italic": ("cormorantgaramond/CormorantGaramond-Italic[wght].ttf", (300, 500), LATIN),
    "jost": ("jost/Jost[wght].ttf", (300, 500), LATIN),
    "noto-serif-sc": ("notoserifsc/NotoSerifSC[wght].ttf", 400, None),  # None: the Chinese in use
}


def fetch(path):
    os.makedirs(CACHE, exist_ok=True)
    local = os.path.join(CACHE, os.path.basename(path))
    if not os.path.exists(local):
        print(f"  downloading {path}")
        urllib.request.urlretrieve(SOURCE + quote(path), local)
    return local


def main():
    os.makedirs(OUT, exist_ok=True)
    chinese = chinese_in_use()
    for name, (path, weight, characters) in FONTS.items():
        font = TTFont(fetch(path))

        options = Options()
        options.layout_features = ["*"]
        options.name_IDs = [0, 1, 2, 3, 4, 5, 6, 13, 14]  # keep the copyright and licence records
        options.hinting = False
        subsetter = Subsetter(options)
        subsetter.populate(unicodes=characters if characters else [ord(c) for c in chinese])
        subsetter.subset(font)

        # Narrow the weight axis to what the stylesheet asks for (after subsetting, or fontTools trips).
        font = instancer.instantiateVariableFont(font, {"wght": weight})

        target = os.path.join(OUT, name + ".woff2")
        font.flavor = "woff2"
        font.save(target)
        print(f"{name}.woff2: {os.path.getsize(target) / 1024:.0f} KB")
    print(f"Chinese characters carried ({len(chinese)}): {''.join(chinese)}")


if __name__ == "__main__":
    main()
