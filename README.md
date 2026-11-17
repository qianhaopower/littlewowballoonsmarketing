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

The order of entries in `pieces.ts` is the catalogue order. The first entry is No. 01 and is the piece shown at the entrance.

## Add a piece

1. Put the photo in `assets/originals/`.
2. Add a line for it to `PIECES` in `scripts/cutout.py`, then run:

   ```bash
   pip install numpy scipy pillow
   python scripts/cutout.py my-new-piece
   ```

   This writes `public/pieces/my-new-piece.webp` and prints its width and height.
3. Add an entry to `src/content/pieces.ts` with that width and height.

The cutout script expects a photo on plain white paper. White balloons on white paper cannot be separated. For new photos, a black backdrop with one light from the side works best; those can be cut out by hand or used directly.

## Add a making-of film

1. Export the film as MP4 (H.264, 1080p or 720p) and put it in `public/films/`, with an optional poster image.
2. On the piece in `src/content/pieces.ts`, set:

   ```ts
   film: { src: "/films/dog.mp4", poster: "/films/dog.jpg" },
   steps: ["Inflate, leaving a hand's width at the tail.", "Twist the nose…"],
   ```

The piece page then shows a "The Making" section with the film and numbered steps, and the label's "Film" row links to it. `balloons`, `time` and `level` are also optional and appear on the label once filled in.

## Deploy

Hosted on AWS Amplify (`amplify.yml`). Work lands on `develop`; merging `develop` into `main` publishes the site.
