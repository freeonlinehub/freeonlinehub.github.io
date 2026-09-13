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
 * Usage: node replace-base-url.mjs
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, extname } from 'node:path';

// The production pages.dev domain is fixed. Do NOT use CF_PAGES_URL here:
// Cloudflare sets it to the per-deployment URL (e.g.
// https://df44839d.<project>.pages.dev) on non-production and some production
// builds, and those hash-prefixed hosts change with every deploy. Override
// with PAGES_BASE_URL if the project is ever renamed.
const FROM = 'https://freeonlinehub.github.io';
const TO = process.env.PAGES_BASE_URL || 'https://freeonlinehub-github-io.pages.dev';

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
