# Hostinger PHP/HTML hosting with automatic GitHub deployment

Repository: https://github.com/PrajaktaAdlytica/InterconnectTrack-site

The repository root already contains the publishable website. Do not select a `dist` folder, run a Node server, or paste the site into a PHP file. A PHP/HTML hosting website can serve these static files directly.

## One-time setup

1. In Hostinger hPanel, go to **Websites → Add website** and choose the **PHP/HTML / custom website** option available on your hosting plan. Choose your purchased domain. If a PHP/HTML website already exists for that domain, open its dashboard instead. The locked Node.js/web-app option is not needed.
2. Back up any existing files in the site's `public_html` before deploying. For a new site, remove the Hostinger starter `default.php` if present. Do not overwrite another live website without keeping its backup.
3. Open the website dashboard → **Advanced → Git → Connect with GitHub**. Authorize the Hostinger GitHub app for this repository (selecting only this repository is sufficient).
4. Select **PrajaktaAdlytica/InterconnectTrack-site**, branch **main**, and deploy/root directory **public_html**. This field is the destination on Hostinger, not a source subfolder. Click **Deploy**.
5. Keep **Auto-deployment enabled**. In the current managed GitHub connection it is on by default and Hostinger manages the webhook. Confirm a successful deployment in the **Deployments** list.
6. Open the domain. If hPanel says it is not connected, follow its domain connection instructions for this hosting website. A domain bought at Hostinger may still need assignment to the correct hosting website. Preserve existing email DNS records. Enable SSL and the HTTPS redirect in hPanel once the domain points correctly.

Hostinger deploys the committed static files as-is. There is no install, build, or start command on the hosting server. This guide does not configure your Hostinger account automatically; you must make the initial connection above.

## Future changes

Edit the files, run `npm run build` locally after page/shell changes, review, commit, and push to `main`. Hostinger receives the push webhook and deploys that commit. Confirm the matching commit and success status in **Deployments**. Allow deployment to finish before checking the live page; it is not instantaneous.

Do not edit production files in Hostinger File Manager as your normal workflow: Git deployments can replace those edits. Keep GitHub as the source of truth. To undo a bad release, revert its commit and push the revert to `main`.

For an initial end-to-end test, make a small intentional text edit, regenerate the HTML, and push. Check the new commit appears in Hostinger and the text appears on the domain. If content appears stale, clear Hostinger's cache and refresh the browser. A manual **Redeploy** can retry a failed deployment.

## If your hPanel shows the older Git interface

Use the public repository URL `https://github.com/PrajaktaAdlytica/InterconnectTrack-site.git` and branch `main`. In that legacy interface, leaving the installation directory blank targets `public_html`; the destination must initially be empty. Back up existing content before clearing it.

After creating/deploying the repository, open its **Auto Deployment** action and copy Hostinger's webhook URL. In GitHub, open **Settings → Webhooks → Add webhook**, use that URL and the push event, and follow the values shown by Hostinger. Check GitHub webhook delivery success and Hostinger deployment status after a push. The managed **Connect with GitHub** workflow above does not require this manual webhook.

If you later make the repository private, use the managed GitHub app connection or follow Hostinger's private-repository deploy-key instructions. Never paste a personal access token into a public file or URL.

## Checks after first deployment

- Homepage intro plays/skips and hands off to the hero and navigation.
- Product pages open directly, and refresh works on nested URLs.
- Footer contains no Vietnam address.
- Images/video load and mobile navigation works.
- An unknown URL returns the custom 404.
- `/_source/routes.json` and `/.git/config` are inaccessible over HTTP.
- Forms remain clearly labeled as preview flows; backend processing is a separate task.

## Official references

Verified October 23, 2026. UI labels can vary between current and legacy panels.

- [Hostinger Git documentation](https://docs.hostinger.com/websites/git): static/PHP deployment, GitHub app connection, auto-deployment, legacy workflow.
- [Hostinger: deploy a Git repository](https://www.hostinger.com/support/1583302-how-to-deploy-a-git-repository-in-hostinger/): PHP/HTML support and managed Git setup.
- [Hostinger: add a website](https://www.hostinger.com/support/1583214-how-to-add-a-website-in-hostinger/).
