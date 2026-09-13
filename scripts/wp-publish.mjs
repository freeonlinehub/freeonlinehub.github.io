#!/usr/bin/env node
/* Publish a FreeToolsHub blog post to the WordPress.com mirror.
 *
 * Usage:
 *   node scripts/wp-publish.mjs blog/<slug>/index.html [options]
 *
 * Options:
 *   --status draft|publish   WordPress post status (default: draft)
 *   --mode full|summary      full = whole article (default), summary = intro + link
 *   --dry-run                print what would be sent, do not call the API
 *
 * Credentials are read from wp-credentials.json (gitignored):
 *   {
 *     "site": "https://freeonlinehub.wordpress.com",
 *     "username": "freeonlinehub",
 *     "appPassword": "xxxx xxxx xxxx xxxx"
 *   }
 */
import { readFileSync } from 'node:fs';

function arg(name, fallback) {
  const i = process.argv.indexOf(name);
  return i !== -1 && process.argv[i + 1] && !process.argv[i + 1].startsWith('--')
    ? process.argv[i + 1]
    : fallback;
}
const hasFlag = (name) => process.argv.includes(name);

const file = process.argv[2];
if (!file || file.startsWith('--')) {
  console.error('Usage: node scripts/wp-publish.mjs blog/<slug>/index.html [--status draft|publish] [--mode full|summary] [--dry-run]');
  process.exit(1);
}
const status = arg('--status', 'draft');
const mode = arg('--mode', 'full');
const dryRun = hasFlag('--dry-run');

const raw = readFileSync(file, 'utf8');
const slug = file.split('/')[file.split('/').length - 2];

function decode(s) {
  return s
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#8217;|&rsquo;/g, '’')
    .replace(/&#8216;|&lsquo;/g, '‘').replace(/&#8220;|&ldquo;/g, '“')
    .replace(/&#8221;|&rdquo;/g, '”').replace(/&#8212;|&mdash;/g, '—')
    .replace(/&#8211;|&ndash;/g, '–').replace(/&#8230;|&hellip;/g, '…')
    .replace(/&#160;|&nbsp;/g, ' ');
}

function match(re, source = raw, group = 1) {
  const m = source.match(re);
  return m ? m[group] : null;
}

const title = decode(match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || match(/<title>([\s\S]*?)<\/title>/) || '').trim();
const canonical = match(/<link rel="canonical" href="([^"]+)"/);
if (!title || !canonical) {
  console.error(`Could not extract title/canonical from ${file}`);
  process.exit(1);
}

/* Extract the article body: the prose div, up to the Related reading section. */
const proseStart = raw.indexOf('<div class="prose');
if (proseStart === -1) {
  console.error('No prose block found');
  process.exit(1);
}
const bodyStart = raw.indexOf('>', proseStart) + 1;
const sectionIdx = raw.indexOf('<section class="mx-auto mt-12 max-w-3xl">', bodyStart);
const bodyEnd = sectionIdx !== -1
  ? raw.lastIndexOf('</div>', sectionIdx)
  : raw.lastIndexOf('</div>');
let content = raw.slice(bodyStart, bodyEnd);

/* Rewrite relative links so they resolve against the live canonical URL. */
content = content.replace(/href="(\.\.?\/[^"]*)"/g, (_, href) => `href="${new URL(href, canonical).toString()}"`);

/* Attribution footer (also the duplicate-content safeguard). */
const attribution = `<hr><p><em>Originally published at <a href="${canonical}">${canonical}</a> on FreeToolsHub.</em></p>`;

let excerptText = decode(match(/<p>([\s\S]*?)<\/p>/, content) || '').replace(/<[^>]+>/g, '').trim();
if (excerptText.length > 155) excerptText = excerptText.slice(0, 152).trimEnd() + '…';

if (mode === 'summary') {
  content = `<p>${excerptText}</p><p><a href="${canonical}">Read the full article on FreeToolsHub →</a></p>`;
} else {
  content += attribution;
}

const payload = {
  title,
  content,
  excerpt: excerptText,
  status,
  slug,
};

if (dryRun) {
  console.log(JSON.stringify({
    endpoint: 'POST {site}/wp-json/wp/v2/posts',
    slug, title, status, mode, canonical,
    excerpt: excerptText,
    contentChars: content.length,
    relativeLinksResolved: (raw.slice(bodyStart, bodyEnd).match(/href="\.\.?/g) || []).length,
  }, null, 2));
  process.exit(0);
}

let creds;
try {
  creds = JSON.parse(readFileSync(new URL('../wp-credentials.json', import.meta.url), 'utf8'));
} catch {
  console.error('wp-credentials.json not found (gitignored). Create it next to this script\'s parent folder:');
  console.error('  { "site": "https://freeonlinehub.wordpress.com", "username": "…", "appPassword": "…" }');
  process.exit(1);
}

const auth = Buffer.from(`${creds.username}:${creds.appPassword}`).toString('base64');
const endpoint = `${creds.site.replace(/\/$/, '')}/wp-json/wp/v2/posts`;

const res = await fetch(endpoint, {
  method: 'POST',
  headers: {
    'Authorization': `Basic ${auth}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify(payload),
});

const body = await res.text();
if (!res.ok) {
  console.error(`WordPress API error ${res.status}: ${body.slice(0, 400)}`);
  if (res.status === 401 || res.status === 403) {
    console.error('Check the application password and username in wp-credentials.json.');
  }
  process.exit(1);
}
const post = JSON.parse(body);
console.log(`✓ WordPress ${post.status} post created: ${post.link}`);
