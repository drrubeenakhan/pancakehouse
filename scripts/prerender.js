import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, '..', p);

const routes = [
  '/'
];

async function prerender() {
  const { render } = await import(toAbsolute('dist-ssr/entry-server.js'));

  const template = fs.readFileSync(
    toAbsolute('dist/public/index.html'),
    'utf-8'
  );

  for (const route of routes) {
    const appHtml = render(route);
    const html = template.replace('<!--app-html-->', appHtml);

    const filePath = route === '/' 
      ? toAbsolute('dist/public/index.html')
      : toAbsolute(`dist/public${route}/index.html`);

    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filePath, html);
    console.log(`✓ Pre-rendered ${route}`);
  }

  console.log('✅ Pre-rendering complete!');
}

prerender().catch((err) => {
  console.error('Pre-rendering failed:', err);
  process.exit(1);
});
