# FreeTools — FreeToolsHub

A static, SEO-first directory of the best free online tools: AI, SEO, images, video,
PDF, developer and social media tools. Live at
**https://laitingyou.github.io/** (GitHub Pages).

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

**Primary:** the `laitingyou/laitingyou.github.io` repo serves the site at
**https://laitingyou.github.io/** (Pages deploys via the bundled
`.github/workflows/deploy-pages.yml`).

**Optional mirror:** the `laitingyou/free-tools` repo serves the same site at
https://laitingyou.github.io/free-tools/. All canonical, Open Graph and sitemap
URLs point to the root site, so the mirror adds no SEO value and can be deleted
at any time. If you keep it, push to both after every change:

```bash
git push origin main && git push pages main
```

If you delete the mirror, push only to `origin` (after pointing it at the
user-site repo):

```bash
git remote set-url origin https://github.com/laitingyou/laitingyou.github.io.git
git push origin main
```

## How to edit

- **Add a tool**: copy an existing `<article class="tool-card …">` block in the
  relevant category page (and in `free-tools/index.html` for the directory), update
  the `data-cat` / `data-search` attributes so filtering works.
- **Add a blog post**: create `blog/<post-slug>/index.html` (copy an existing post),
  add a card to `blog/index.html` and a `<url>` entry to `sitemap.xml`.
- Tailwind classes are generated at runtime by the local `js/tailwindcss.js` —
  nothing to rebuild, just edit HTML and commit.
