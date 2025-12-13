import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, '..', p);

const SITE_URL = process.env.SITE_URL || 'https://www.mapleleafpancakehouse.ca';

const routes = [
  { url: '/', priority: 1.0, changefreq: 'weekly' },
  { url: '/menu.pdf', priority: 0.8, changefreq: 'monthly' }
];

function generateSitemap() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${SITE_URL}${route.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(toAbsolute('dist/public/sitemap.xml'), sitemap);
  console.log('✅ Sitemap generated!');
}

generateSitemap();
