# InterConnectTrack

Static company and product website. Ready to serve directly from Hostinger PHP/HTML hosting: `index.html` is at the repository root. No Node.js server, PHP application, database, or hosting build command is required.

**Deployment:** [Hostinger setup and automatic Git deployment](HOSTINGER.md)

## Editing

- `app.js`: page content, shared navigation/footer, interactive product examples.
- CSS files: visual styles and responsive layout.
- `intro.js` and `site-motion.js`: intro playback and scrolling behavior.
- `assets/`: images, fonts, and finished intro videos.
- `_source/source-template.html`: shared HTML document shell.
- `_source/routes.json`: routes exported as real HTML directories.
- `film-source/`: editable Remotion film project; separate dependencies and rendering workflow.

After changing page content or the HTML shell, run:

```sh
npm run build
```

This dependency-free Node script regenerates 42 HTML pages and checks rendered headings, internal links, and asset references. Commit the regenerated HTML together with source changes. Hostinger deploys the committed files as-is; it does not run this command.

For local preview, run `python3 -m http.server 8080` from this folder and open http://localhost:8080. Python's preview server does not apply `.htaccess` protections; use only locally.

Push changes to `main` after review. Once configured in Hostinger, that branch automatically deploys. Changes to another branch require merging into `main`.

## Scope

The website and demos are static. Evaluation/contact forms and sign-in demonstrate local preview flows; they do not send email, store submissions on a server, or authenticate users. Deploying to PHP hosting does not add these backend capabilities. LinkedIn and Crunchbase icons remain disabled intentionally. Funding amount and investor names are not announced.

The Vietnam address has been removed. Existing design, intro, and responsive QA notes are in [docs/Final-QA.md](docs/Final-QA.md).

`.htaccess` sets the index, custom 404, revalidation for HTML/CSS/JS, and blocks development folders from web access. Those authoring files remain visible in this public GitHub repository. Never commit credentials or private documents.
