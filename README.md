# FreeTools — FreeToolsHub

A static, SEO-first directory of the best free online tools: AI, SEO, images, video,
PDF, developer and social media tools. Live at
**https://freeonlinehub.github.io/** (GitHub Pages).

## Tech stack

- **Plain HTML** — one `index.html` per page, no framework, no build step
- **Tailwind CSS** via the self-hosted Play CDN (`js/tailwindcss.js`, downloaded from
  `https://cdn.tailwindcss.com?plugins=typography`) — fully offline, nothing compiled
- **Shared config & components** in `js/site.js` (component classes, mobile nav,
  directory search/filter)
- Dark mode follows the OS (`prefers-color-scheme`), SEO basics on every page
  (canonical, Open Graph, JSON-LD, `sitemap.xml`, `robots.txt`)

## Structure

```
/                        Home
/free-tools/             Tool directory (search + category filters)
/ai-tools/               Free AI tools
/best-ai-tools/          Ranked best-of listicle
/seo-tools/              Free SEO tools
/free-image-tools/       Free image tools
/free-video-tools/       Free video tools
/free-pdf-tools/         Free PDF tools
/developer-tools/        Free developer tools
/social-media-tools/     Free social media tools
/blog/                   Blog (+ one folder per post)
```

## Deployment

The site lives in the `freeonlinehub/freeonlinehub.github.io` repo and is
served at **https://freeonlinehub.github.io/** — GitHub Pages deploys it with
the bundled `.github/workflows/deploy-pages.yml` on every push to `main`:

```bash
git push origin main
```

Note: the former `laitingyou/free-tools` mirror at
https://freeonlinehub.github.io/free-tools/ has been retired (its Pages is
disabled); all canonical, Open Graph and sitemap URLs point at the root site.

**Cloudflare Pages mirror:** the repo is also connected to Cloudflare Pages,
which serves the same site at https://freeonlinehub-github-io.pages.dev/. Set
its build command to `node replace-base-url.mjs` (output directory `.`) so the
deployed copy rewrites all canonical, OG, JSON-LD, sitemap and robots URLs to
the pages.dev domain. The rewrite runs only inside Cloudflare's build — the
repo itself always keeps the github.io URLs, and GitHub Pages stays canonical.

## How to edit

- **Add a tool**: copy an existing `<article class="tool-card …">` block in the
  relevant category page (and in `free-tools/index.html` for the directory), update
  the `data-cat` / `data-search` attributes so filtering works.
- **Add a blog post**: create `blog/<post-slug>/index.html` (copy an existing post),
  add a card to `blog/index.html` and a `<url>` entry to `sitemap.xml`.
- **Add a new page** (category, landing page, …): create `<folder>/index.html`
  from an existing page's shell, link it from the nav/footer, and add a
  `<url>` entry to `sitemap.xml` — every new page must be in the sitemap.
- Tailwind classes are generated at runtime by the local `js/tailwindcss.js` —
  nothing to rebuild, just edit HTML and commit.
