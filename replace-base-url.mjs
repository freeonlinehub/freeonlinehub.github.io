#!/usr/bin/env node
/**
 * Cloudflare Pages build step: rewrite the site's absolute base URL for the
 * pages.dev deployment.
 *
 * The GitHub Pages deployment serves https://freeonlinehub.github.io/ and the
 * repo's HTML/XML declare that domain in canonical, Open Graph, JSON-LD,
 * sitemap.xml and robots.txt. When Cloudflare Pages builds the same repo for
 * https://freeonlinehub-github-io.pages.dev/, run this script as the build
 * command so the deployed copy references its own domain.
 *
 * The rewrite only touches Cloudflare's ephemeral build copy — nothing is
 * committed back to the repo, so GitHub Pages keeps the github.io URLs.
 *
 * Usage: node replace-base-url.mjs <base-url>
 * Example (Cloudflare Pages build command):
 *   node replace-base-url.mjs https://freeonlinehub-github-io.pages.dev
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, extname } from 'node:path';

// The source domain baked into the repo. Override the target per deployment
// by passing a different <base-url> argument.
const FROM = 'https://freeonlinehub.github.io';

const target = process.argv[2];
if (!target) {
  console.error('Usage: node replace-base-url.mjs <base-url>');
  console.error('Example: node replace-base-url.mjs https://freeonlinehub-github-io.pages.dev');
  process.exit(1);
}
const TO = target.replace(/\/+$/, '');
try {
  const u = new URL(TO);
  if (!/^https?:$/.test(u.protocol)) throw new Error('bad protocol');
} catch {
  console.error(`Invalid base URL: ${target}`);
  process.exit(1);
}

const EXTENSIONS = new Set(['.html', '.xml', '.txt']);
const SKIP_DIRS = new Set(['.git', 'node_modules', '.claude']);

let scanned = 0;
let rewritten = 0;

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) walk(join(dir, entry.name));
      continue;
    }
    if (!EXTENSIONS.has(extname(entry.name).toLowerCase())) continue;
    const path = join(dir, entry.name);
    scanned++;
    const content = readFileSync(path, 'utf8');
    if (content.includes(FROM)) {
      writeFileSync(path, content.split(FROM).join(TO));
      rewritten++;
      console.log(`rewrote ${path}`);
    }
  }
}

walk(process.cwd());
console.log(`base URL rewrite: ${rewritten}/${scanned} files updated (${FROM} → ${TO})`);
