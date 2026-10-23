# InterConnectTrack intro

12-second silent product film, 30 fps. Three scenes: compare two sites, trace a changed study date, prepare an evidence packet. Photos are illustrative; the records are synthetic. Typography and UI are rendered from native HTML rather than scaled screenshots.

## Responsive outputs

| Composition | File suffix | Size |
| --- | --- | --- |
| IntroMobile | mobile | 900 × 1800 |
| IntroTall | tall | 1050 × 1400 |
| IntroSquare | square | 1200 × 1200 |
| Intro | desktop | 1500 × 1000 |
| IntroWide | wide | 1920 × 984 |

Outputs live in the website's `assets/` directory: `intro-{suffix}-v3.mp4` and `intro-poster-{suffix}-v3.jpg`. H.264, CRF 20, yuv420p, fast-start metadata. The browser chooses the closest aspect ratio and fills the viewport. Only the selected video downloads. The tall video is revision `v4` (same v3 poster), with compact packet rows for medium portrait screens.

## Edit and render

Run `npm ci`, then `npm run dev`. Edit `src/Film.tsx` and `src/Root.tsx`.

Example:

```sh
npx remotion render Intro ../assets/intro-desktop-v3.mp4 --codec=h264 --crf=20 --pixel-format=yuv420p --concurrency=1
npx remotion still Intro ../assets/intro-poster-desktop-v3.jpg --frame=50
```

Repeat for each composition/suffix. If using a full Chrome for Testing binary, supply `--chrome-mode=chrome-for-testing --browser-executable='/absolute/path/to/chrome'`.

## Website integration

`../intro.js` handles playback, tab visibility, skip/replay, media errors, reduced motion, and data-saving preferences. `../intro.css` keeps the logo crisp as a separate SVG and the controls accessible. End/skip dissolves into the homepage and reveals the navbar without changing page scroll geometry. `node ../scripts/check-intro.cjs` exercises lifecycle and framing choices.

Attribution for the infrastructure photography is in `public/media-credits.txt`. Older scene source files remain as references but are not registered in the current film.
