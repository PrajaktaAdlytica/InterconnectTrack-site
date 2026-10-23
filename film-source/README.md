# InterConnectTrack intro — enlarged, sharp product walkthrough

16-second silent film, 30 fps. Real infrastructure photography leads into the website's synthetic evidence records, queue revision and engineer review packet.

## Responsive outputs
- `public/intro-desktop-v2.mp4`: 1920 × 1200.
- `public/intro-square-v2.mp4`: 1200 × 1240, for tablet and near-square browser windows.
- `public/intro-mobile-v2.mp4`: 1080 × 2340.
- All are H.264, CRF 17, yuv420p. Posters use the corresponding aspect ratio.
- Product interfaces use native HTML/vector text and the website's site artwork, replacing flattened screenshots. Source values and synthetic-data labels are retained.
- Attribution for the opening photography is in `public/media-credits.txt`.

## Edit and render
`npm install` then `npm run dev`.
Compositions: `Intro`, `IntroSquare`, `IntroMobile`. Scenes, timing, typography and transitions are in `src/`.

`npx remotion render src/index.ts Intro public/intro-desktop-v2.mp4 --codec=h264 --crf=17 --pixel-format=yuv420p --concurrency=2`

Use the corresponding composition/output for the other formats. Supply a known-good Chromium executable using `--browser-executable` if the downloaded browser has platform issues.

## Website integration
The video fills the viewport. Aspect ratio chooses the correct variant. A live SVG logo sits in the top-left corner, remaining crisp during playback. Directional scene wipes and staggered evidence reveals are pre-rendered, with no scene-rendering runtime shipped to visitors.

The navbar and underlying controls are hidden/inert during playback. End/skip dissolves the intro while the navbar enters, preserving the page's scroll geometry. Pause, skip, Escape, replay, autoplay rejection, media failure, reduced motion, data saving and deep links are handled in `dist/intro.js` in the companion website project.
