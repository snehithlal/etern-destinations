import type { APIRoute } from 'astro';
import { site, href } from '../data/site';
export const GET: APIRoute = ({ site: origin }) => new Response(
  site.live
    ? `User-agent: *\nAllow: /\nSitemap: ${new URL(href('/sitemap-index.xml'), origin).href}\n`
    : 'User-agent: *\nDisallow: /\n',
  { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
);
