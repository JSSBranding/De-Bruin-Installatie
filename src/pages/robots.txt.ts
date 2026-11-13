import type { APIRoute } from 'astro';
import { isProduction } from '../config/site';

/** Productie: indexeren toegestaan + sitemap. Andere omgevingen: alles blokkeren. */
export const GET: APIRoute = ({ site }) => {
  const body = isProduction
    ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap-index.xml', site).href}\n`
    : `# Test- of ontwikkelomgeving: niet indexeren\nUser-agent: *\nDisallow: /\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
