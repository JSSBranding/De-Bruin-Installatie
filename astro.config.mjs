// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';

const env = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');
const SITE_URL = env.PUBLIC_SITE_URL || 'https://www.debruininstallatie.nl';

// Sitemap volgt dezelfde regels als de robots-meta van de pagina's:
// - /projecten/ alleen als er echte (niet-demo, niet-draft) projecten zijn;
// - /privacy/ pas na goedkeuring (privacyApproved in src/config/site.ts).
const projectDir = './src/content/projecten';
const hasRealProjects = readdirSync(projectDir)
  .filter((f) => f.endsWith('.md'))
  .some((f) => !/^(demo|draft):\s*true/m.test(readFileSync(`${projectDir}/${f}`, 'utf8')));
const privacyApproved = /privacyApproved:\s*true/.test(readFileSync('./src/config/site.ts', 'utf8'));

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',
  build: { format: 'directory' },
  // Onderhoud en service heeft één canonieke pagina.
  redirects: {
    '/diensten/onderhoud-en-service': '/onderhoud-en-service/',
  },
  integrations: [
    sitemap({
      // Sitemap bevat nooit demo-, 404- of doorverwijspagina's.
      filter: (page) =>
        !page.includes('/projecten/voorbeeld-') &&
        (hasRealProjects || !page.endsWith('/projecten/')) &&
        (privacyApproved || !page.endsWith('/privacy/')) &&
        !page.includes('/404') &&
        !page.includes('/diensten/onderhoud-en-service'),
    }),
  ],
  image: {
    responsiveStyles: false,
  },
});
