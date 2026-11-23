# Little Wow

A personal showcase of balloon sculptures, presented like a jewellery exhibition: a dark ground, one piece per plinth, and no colour on the page except the balloons.

Built with Next.js (App Router). Every page is static.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Where things live

| What | Where |
| --- | --- |
| The collection (names, notes, order) | `src/content/pieces.ts` |
| Piece photographs (transparent WebP) | `public/pieces/` |
| Making-of films | `public/films/` (create when the first film arrives) |
| Original photos, before cutting out | `assets/originals/` (not served) |
| Look and feel | `src/app/globals.css` |
| Home page / piece page | `src/app/page.tsx`, `src/app/pieces/[slug]/page.tsx` |

The order of entries in `pieces.ts` is the catalogue order; the first entry is No. 01. The piece shown at the entrance is set by `FLAGSHIP` in the same file.

## Add a piece

1. Put the photo in `assets/originals/`.
2. Cut it out. Which script depends on the photo:

   - **On plain white paper:** add a line to `PIECES` in `scripts/cutout.py`, then

     ```bash
     pip install numpy scipy pillow
     python scripts/cutout.py my-new-piece
     ```

   - **Anywhere else** (against a wall, held in a hand, white balloons on white paper): add a line to `PIECES` in `scripts/lift.py`, then

     ```bash
     pip install numpy scipy pillow opencv-python-headless
     python scripts/lift.py my-new-piece
     ```

     This one runs on a Mac only. It starts from the system's own subject lifting, then tightens the outline. The options at the top of the script cover what the first pass gets wrong: white parts it dropped, a hand to fade out, a shelf to peel away.

   Either script writes `public/pieces/my-new-piece.webp` and prints its width and height.
3. Add an entry to `src/content/pieces.ts` with that width and height.
4. If the entry has a Chinese name (`nameZh`), run `python scripts/fonts.py` (see Fonts below).

For new photos, a plain backdrop that is not the colour of the balloons, with one light from the side, gives the cleanest result.

## Add a making-of film

1. Export the film as MP4 (H.264, 1080p or 720p) and put it in `public/films/`, with an optional poster image.
2. On the piece in `src/content/pieces.ts`, set:

   ```ts
   film: { src: "/films/dog.mp4", poster: "/films/dog.jpg" },
   steps: ["Inflate, leaving a hand's width at the tail.", "Twist the nose…"],
   ```

The piece page then shows a "The Making" section with the film and numbered steps, and the label's "Film" row links to it. `balloons` and `time` are also optional and appear on the label once filled in.

## Difficulty

Every piece has a `difficulty` in stars in `src/content/pieces.ts`: 1 is a first twist, 5 is the hardest, halves are allowed, and anything above 5 is shown as off the scale. The stars appear on each tile and piece page, and the collection can be filtered by them. A filtered view has its own address, for example `/?difficulty=1#collection`, so it can be shared.

## Fonts

Cormorant Garamond, Jost and Noto Serif SC live in `src/fonts`, so a build never has to download anything. (They used to come from Google Fonts at build time, and a failed fetch there failed the deploy.)

```bash
pip install fonttools brotli
python scripts/fonts.py
```

rebuilds them from the upstream files. Run it after adding or changing a Chinese name: the Chinese font carries only the characters the site uses, and a character it lacks is drawn in whatever font the visitor's device has.

## Deploy

Hosted on AWS Amplify (`amplify.yml`). Work lands on `develop`; merging `develop` into `main` publishes the site.
