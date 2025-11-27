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

      if (!isProduction) {
        template = fs.readFileSync(
          path.resolve(__dirname, '../client/index.html'),
          'utf-8'
        );
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render;
      } else {
        template = fs.readFileSync(
          path.resolve(__dirname, '../dist/public/index.html'),
          'utf-8'
        );
        render = (await import('../dist-ssr/entry-server.js')).render;
      }

      const appHtml = render(url);
      const html = template.replace('<!--app-html-->', appHtml);

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
