import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// The same static output works on Cloudflare Pages, Vercel and GitHub Pages.
const env = { ...loadEnv(process.env.NODE_ENV || 'production', process.cwd(), ''), ...process.env };
const site = env.SITE_URL || 'https://example.com';
const base = env.BASE_PATH || '/';
if (env.PUBLIC_SITE_LIVE === 'true') {
  const origin = new URL(site);
  if (origin.protocol !== 'https:' || ['example.com', 'localhost', '127.0.0.1'].includes(origin.hostname)) {
    throw new Error('A live build requires SITE_URL with the real HTTPS production domain.');
  }
}
export default defineConfig({
  site,
  base,
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
  build: { format: 'directory' },
});
