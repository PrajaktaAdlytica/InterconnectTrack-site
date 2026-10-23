# Landscape intro QA — 23 October 2026

Current intro: owner-supplied Google Flow / Veo landscape, 8 seconds, 1280×720, 24fps.
The original H.264 stream is copied losslessly into a fast-start MP4; audio is omitted.
The platform watermark is retained. Footage is illustrative, not a customer-site claim.

The actual reversed InterConnectTrack SVG and two Manrope text scenes are separate HTML layers. Opacity and translate animations follow the media clock using requestVideoFrameCallback, with requestAnimationFrame fallback. Pause, buffering, seek and replay keep text in sync. No blur, video upscaling encode, canvas, or live 3D rendering is added.

Checks completed:
- All 42 static routes render and internal links/assets resolve.
- Intro lifecycle tests cover reduced-motion and save-data bypass, hash links, end, media error, skip, replay, Escape, hidden-tab pause/resume, and intentional pause.
- Text timing tests cover both scenes and seek/reset.
- Browser inspection at 1440×900, 775×804 and 390×844: readable overlays, visible logo/controls, no mobile horizontal overflow.
- Browser playback, pause, resume, natural completion and skip verified; navbar hidden during intro and visible after completion, scrolling released.
- No browser warnings/errors observed in local preview.

Current media: assets/intro-landscape-v5.mp4 and assets/intro-landscape-poster-v5.jpg.
Cache keys: app.js?v=intro-5, intro.js?v=5 and intro.css?v=5.
Older Remotion source remains archived in film-source; it no longer drives the website intro.

Original footage is 720p; large displays scale that footage. The SVG logo and HTML typography stay sharp independently of video resolution.
