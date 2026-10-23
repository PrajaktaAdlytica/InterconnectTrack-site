# Final website QA — 23 October 2026

Address removal: removed the Vietnam postal address and location heading from the company page; removed the address from the shared footer. Regenerated every route. No Hoang Dieu, Ho Chi Minh, Vietnam or 790680 matches remain in published assets/HTML.

Passed:
- All 42 routes render with an H1; internal routes and referenced assets resolve.
- Browser checks across all 41 supporting routes at desktop width: no horizontal overflow, address remnants or missing H1s.
- Mobile browser checks on all five product pages, platform, solutions, resources, company, contact, sign-in and primary demo views: no horizontal overflow or broken loaded images.
- Evaluation: required field errors, valid first step, scope/consent and request-preview confirmation.
- Sign-in: valid-email preview correctly states that no email is sent.
- Mobile evaluation form: first-step submit at 606px in a 390x844 viewport; no scroll needed.
- Mobile menu opens, products expand, Grid Desk link reaches its correct page.
- Intro skip restores visible navbar; lifecycle harness passes completion, media failure, Escape, replay, reduced motion, save-data and deep-link paths.
- Homepage product chapters advance on downward scroll and return on upward scroll.
- No browser console errors captured during these checks.
- Public access retained; no account is required to view the marketing website.

Scope and limitations: responsive Chromium testing, not physical-device or cross-browser certification. This remains a synthetic-data prototype. Forms, email sign-in and live integrations are not connected; their preview-only notices remain visible. Disabled social links and unannounced funding placeholders remain intentional.
