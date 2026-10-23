# Intro revision 3 — October 23, 2026

## Changes

- Replaced the previous 16-second film with a 12-second, three-step product walkthrough.
- Larger evidence records; simpler comparison, source-change, and packet scenes.
- Five aspect-ratio-specific exports selected by closest viewport ratio. Removed the CSS `contain` overrides responsible for narrow letterboxed playback.
- SVG corner logo remains outside the video; no navbar during the film. End/skip dissolves into the page and reveals the navbar.
- Explicit muted, inline playback; a video paused by hiding the tab resumes when returning. A deliberate user pause remains paused.
- H.264/yuv420p exports use lossless PNG intermediate frames and CRF 20. MP4 metadata precedes video data for progressive playback.
- Versioned asset names and script/style URLs avoid reusing previous intro files from browser/CDN caches.

## Verification

- All 42 routes regenerate with internal links/assets resolving and page headings present.
- Intro lifecycle harness passes reduced motion, save-data, deep links, completion, media error, skip, replay, Escape, five framing selections, tab visibility resume, and intentional pause preservation.
- TypeScript and JavaScript syntax checks pass.
- Local browser playback checked at phone, tablet, and desktop sizes. Pause/resume works. Completion reports 12 seconds, intro hidden, navbar visible, and page scroll unlocked.
- Inspected rendered mobile, tablet, desktop, and wide scenes; corrected packet clipping and the square-format heading spacing found during inspection.
- Browser console has no captured errors during the final local desktop playback check.

These checks verify the tested browser and viewport sizes. They are not a claim that every device or network condition has been tested. Hostinger deployment verification is reported separately after the Git push.
