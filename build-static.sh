#!/bin/bash
set -e

echo "🔨 Starting production build..."

echo "📦 Cleaning previous builds..."
rm -rf dist dist-ssr

echo "🎨 Building client bundle..."
npx vite build

echo "⚙️  Building SSR bundle..."
npx vite build --ssr src/entry-server.tsx --config vite.config.ssr.ts

echo "🎭 Pre-rendering routes..."
node scripts/prerender.js

echo "🗺️  Generating sitemap..."
node scripts/generate-sitemap.js

echo "🤖 Copying robots.txt..."
if [ -f "client/public/robots.txt" ]; then
  cp client/public/robots.txt dist/public/robots.txt
fi

echo "📄 Copying PDF menu..."
if [ -f "client/public/menu.pdf" ]; then
  cp client/public/menu.pdf dist/public/menu.pdf
fi

echo "✅ Build complete! Output in dist/public/"
