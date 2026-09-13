---
name: blog
description: Write, update, or publish a FreeToolsHub blog post. Use when the user asks to add a blog article, write a post, update the blog, or revise an existing post (blog/**). Enforces E-E-A-T standards, on-page SEO, FAQ + FAQPage schema, internal/external linking, a related-reading section on every post, and the required blog-list and sitemap updates.
---

# FreeToolsHub blog publishing skill

The blog is hand-written static HTML served by GitHub Pages — **no build step, no
framework**. Every post is `blog/<slug>/index.html`; Tailwind comes from the
self-hosted runtime (`js/tailwindcss.js`) plus shared config in `js/site.js`, so
you only ever edit HTML and commit.

## Before writing anything

1. Read `blog/index.html` — the post list (newest first). Know what already
   exists; do not duplicate topics.
2. Read the newest post under `blog/` as the canonical template (structure,
   header/footer, meta, JSON-LD, prose wrapper).
3. Confirm the site's own products so you can place them honestly:
   VEONIB (https://veonib.com, AI product videos), FLOWNIB (https://flownib.com,
   AI social publishing), Backlink Submit (https://backlinksubmit.com, free
   backlink database), SocialToPrompt (https://socialtoprompt.com, social video →
   AI prompt).

## File & URL rules

- Slug: lowercase kebab-case, keyword-rich, e.g. `best-free-keyword-research-tools`.
- Create `blog/<slug>/index.html`. It sits **two levels deep**, so assets and
  category links are `../../` and sibling posts are `../`:
  - `../../js/tailwindcss.js`, `../../js/site.js`, `../../favicon.svg`
  - internal category links like `../../seo-tools/`, `../../free-tools/`
  - links to other posts: `../<other-slug>/`
- Copy the full page shell from the template post: sticky header (with
  `data-nav-toggle` / `data-nav` and `main-nav` classes), footer, `wrap`
  container, `.crumbs` breadcrumb (`<a href="../">Blog</a> / <title>`).

## SEO checklist (every post, no exceptions)

- `<title>`: ≤ 60 chars, primary keyword near the front.
- `meta description`: 140–160 chars, keyword + concrete value promise.
- `<link rel="canonical">` → `https://freeonlinehub.github.io/blog/<slug>/`
- Open Graph: `og:type=article`, `og:site_name=FreeToolsHub`, title, description, url.
- JSON-LD **BlogPosting**: headline, datePublished (ISO), dateModified, author and
  publisher as `{"@type":"Organization","name":"FreeToolsHub"}`, url.
- JSON-LD **BreadcrumbList**: Home → Blog → Post (see `best-ai-tools/index.html` for syntax).
- One `<h1>` only, primary keyword in it; H2/H3 hierarchy matches the visible outline.
- Body text lives inside
  `<div class="prose prose-slate mt-8 max-w-none dark:prose-invert prose-a:text-indigo-600 dark:prose-a:text-indigo-400">`.
- Posts with 5+ sections get the TOC card (`<div class="toc not-prose …">`, copy
  from `blog/best-free-ai-video-generators/index.html`) with in-page anchors.

## E-E-A-T requirements

- **Experience**: write from hands-on use — concrete limits, quotas, workflows,
  "we tested / we use this for…". No vague AI-flavoured filler; verify claims
  against the tool's site before publishing.
- **Expertise**: name versions/dates, state who each tool is *not* for, and
  explain trade-offs honestly.
- **Authoritativeness**: author/publisher is the FreeToolsHub organization
  (JSON-LD); cite primary sources (official docs, changelogs, pricing pages) —
  these double as your authoritative external links.
- **Trustworthiness**:
  - Every post that mentions one of the four own products must include the
    disclosure box inside the prose block (copy verbatim):
    ```html
    <aside class="not-prose my-6 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-400">
      <strong>Disclosure:</strong> FreeToolsHub is built by the team behind
      <a class="font-semibold" href="https://veonib.com" target="_blank" rel="noopener">VEONIB</a>,
      <a class="font-semibold" href="https://flownib.com" target="_blank" rel="noopener">FLOWNIB</a>,
      <a class="font-semibold" href="https://backlinksubmit.com" target="_blank" rel="noopener">Backlink Submit</a> and
      <a class="font-semibold" href="https://socialtoprompt.com" target="_blank" rel="noopener">SocialToPrompt</a>.
      We label them “Editor’s Pick” and recommend third-party tools on merit.
    </aside>
    ```
  - Never invent statistics, reviews, or quotes. Dates are real; set
    `dateModified` when you revise an old post and update the visible
    "Updated …" line.
  - US English, tone matching existing posts: practical, honest, free-first.

## Required content blocks

1. **FAQ section (mandatory)** — H2 “Frequently asked questions” (or FAQ), 3–5
   H3 questions with 2–4 sentence answers inside the prose block. Every visible
   Q&A pair must also appear in a **FAQPage** JSON-LD block in `<head>`:
   ```html
   <script type="application/ld+json">
   {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[
     {"@type":"Question","name":"…?","acceptedAnswer":{"@type":"Answer","text":"…"}}
   ]}
   </script>
   ```
2. **Related reading (mandatory)** — after the prose block, before the footer:
   ```html
   <section class="wrap mx-auto mt-12 max-w-3xl">
     <h2 class="text-xl font-extrabold tracking-tight">Related reading</h2>
     <div class="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
       <a class="post-card" href="../<other-slug>/">…same card anatomy as blog/index.html…</a>
     </div>
   </section>
   ```
   Link 2–3 genuinely related posts (or the blog index if fewer exist).

## Linking rules

- **Internal links (内链)**: 3–6 per post, with descriptive anchors (never
  "click here"): related category page, the directory `/free-tools/`,
  `/best-ai-tools/` when relevant, and sibling posts. Add the reciprocal
  direction too — see publish checklist.
- **External links (外链)**: 2–5 per post to authoritative primary sources.
  **Never add `nofollow`** — site policy is that every external link passes
  full link equity. Use `target="_blank" rel="noopener"` for all external
  links, own products and third-party alike (`noopener` is a security
  attribute only; it has no SEO effect).

## Publish checklist — a post is NOT done until all of this is true

1. `blog/index.html`: new post-card added at the **top** of the grid. Card
   anatomy (copy from existing): category label colour (AI Video=indigo,
   SEO=emerald, PDF=orange, Image=sky, Video=pink, Developer=teal,
   Social=violet — pick the nearest for new topics), `<h2>` title, 1–2 sentence
   description, `<span>` date · read time.
2. `sitemap.xml`: add an entry for the new post, e.g.
   `<url><loc>https://freeonlinehub.github.io/blog/<slug>/</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>`.
   This applies to **any new page anywhere on the site** — a new category page
   or landing page must also get a matching `<url>` entry (use
   `weekly`/`0.8` for category pages).
3. Reciprocal internal links: open the 1–2 most related existing posts and add
   a link to the new post in their prose or "Related reading" grid (also update
   their `dateModified` only if you change body text).
4. FAQ + FAQPage JSON-LD present and matching; BlogPosting + BreadcrumbList present.
5. Disclosure box present if own products are mentioned.
6. Verify locally before pushing: serve the folder (`python3 -m http.server`),
   open the post, confirm no console errors, prose renders, TOC anchors jump,
   and every internal link resolves (no 404s). Then `git add`, commit with a
   descriptive message, and `git push origin main` — the site (and the post)
   goes live at https://freeonlinehub.github.io/ via the bundled Pages workflow.
7. WordPress mirror: publish the same article to the WordPress.com site with
   `node scripts/wp-publish.mjs blog/<slug>/index.html --status publish`
   (default mode is the full article plus an "Originally published at"
   attribution footer; use `--mode summary` for a teaser + link instead).
   The script reads the gitignored `wp-credentials.json`; if that file is
   missing, say so and skip this step.
