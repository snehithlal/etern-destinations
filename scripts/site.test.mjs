import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { existsSync, readFileSync } from 'node:fs';
import { parseEnv } from 'node:util';
const env = { ...(existsSync('.env') ? parseEnv(readFileSync('.env', 'utf8')) : {}), ...process.env };

const root = path.resolve(env.OUTPUT_DIR || 'dist');
const routes = ['', 'cottage', 'gallery', 'explore', 'contact', 'privacy'];
const base = (env.BASE_PATH || '').replace(/\/$/, '');
const live = env.PUBLIC_SITE_LIVE === 'true';

for (const route of routes) {
  test(`static route /${route} has crawlable content and correct metadata`, async () => {
    const html = await readFile(path.join(root, route, 'index.html'), 'utf8');
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1);
    assert.match(html, /<title>.+Etern Destinations<\/title>/);
    assert.match(html, /name="description" content="[^"]+"/);
    assert.match(html, /rel="canonical" href="https:\/\//);
    assert.match(html, new RegExp(`name="robots" content="${live ? 'index,follow' : 'noindex,nofollow'}"`));
    assert.match(html, /<main id="main">/);
    assert.match(html, /application\/ld\+json/);
    // All internal links and bundled resources must resolve, including base-path builds.
    for (const match of html.matchAll(/(?:href|src)="(\/[^"#?]*)[^\"]*"/g)) {
      let url = match[1];
      if (base) { assert.ok(url.startsWith(`${base}/`), `${url} must respect ${base}`); url = url.slice(base.length); }
      const file = path.join(root, decodeURIComponent(url), url.endsWith('/') ? 'index.html' : '');
      assert.ok((await stat(file)).isFile(), `Missing asset/link ${url}`);
    }
  });
}
test('robots follows the launch setting and sitemap exists', async () => {
  const robots = await readFile(path.join(root, 'robots.txt'), 'utf8');
  assert.match(robots, live ? /Allow: \/\nSitemap: https:\/\// : /Disallow: \//);
  assert.ok((await stat(path.join(root, 'sitemap-index.xml'))).isFile());
});
test('contact route does not include unconnected enquiry forms', async () => {
  const html = await readFile(path.join(root, 'contact/index.html'), 'utf8');
  assert.doesNotMatch(html, /<form(?:\s|>)/);
});
