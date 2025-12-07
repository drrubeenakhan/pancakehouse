import express from 'express';
import compression from 'compression';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 5000;
const base = process.env.BASE || '/';

let vite: any;

async function createServer() {
  const app = express();

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
      base
    });
    app.use(vite.middlewares);
  } else {
    app.use(compression({ level: 6, threshold: 1024 }));
    app.use(base, express.static(path.resolve(__dirname, '../dist/public'), {
      maxAge: '1y',
      immutable: true
    }));
  }

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl.replace(base, '');

      let template: string;
      let render: (url: string) => string;
      let cssContent = '';

      if (!isProduction) {
        template = fs.readFileSync(
          path.resolve(__dirname, '../client/index.html'),
          'utf-8'
        );
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render;
        
        // Get the CSS from Vite in dev mode
        try {
          const cssModule = await vite.ssrLoadModule('/src/index.css');
          const cssResult = await vite.transformRequest('/src/index.css');
          if (cssResult && cssResult.code) {
            cssContent = `<style>${cssResult.code}</style>`;
          }
        } catch (e) {
          // Fallback: just link to the CSS
          cssContent = '<link rel="stylesheet" href="/src/index.css">';
        }
      } else {
        template = fs.readFileSync(
          path.resolve(__dirname, '../dist/public/index.html'),
          'utf-8'
        );
        render = (await import('../dist-ssr/entry-server.js')).render;
      }

      const appHtml = render(url);
      let html = template.replace('<!--app-html-->', appHtml);
      
      // Inject CSS before </head>
      if (cssContent) {
        html = html.replace('</head>', `${cssContent}</head>`);
      }

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      if (!isProduction && vite) {
        vite.ssrFixStacktrace(e as Error);
      }
      console.error((e as Error).stack);
      res.status(500).end((e as Error).stack);
    }
  });

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

createServer();
