# Pancake House - West Hamilton

A 90s-themed breakfast restaurant website with SSR/SSG architecture optimized for Vercel deployment.

## Overview

This project is a modern React + TypeScript application built with Vite, featuring:
- Server-Side Rendering (SSR) for initial page loads
- Static Site Generation (SSG) for production builds
- Tailwind CSS for styling
- Express server for development SSR
- Optimized for perfect Lighthouse scores

## Project Structure

```
├── client/                    # Frontend application
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── services/          # API services
│   │   ├── App.tsx           # Main app component
│   │   ├── entry-client.tsx  # Client entry (hydration)
│   │   ├── entry-server.tsx  # Server entry (SSR)
│   │   └── index.css         # Global styles
│   ├── index.html            # HTML template
│   └── public/               # Static assets
├── server/                    # Backend server
│   └── index.ts              # Express server
├── scripts/                   # Build scripts
│   ├── prerender.js          # Pre-rendering script
│   ├── generate-sitemap.js   # Sitemap generator
│   └── optimize-images.cjs   # Image optimization
├── shared/                    # Shared types/schemas
├── dist/                      # Build output
├── dist-ssr/                  # SSR build output
├── vite.config.ts            # Vite client config
├── vite.config.ssr.ts        # Vite SSR config
├── tailwind.config.ts        # Tailwind config
├── vercel.json               # Vercel deployment config
└── build-static.sh           # Production build script
```

## Scripts

- `npm run dev` - Start Vite development server
- `npm run dev:ssr` - Start Express SSR development server
- `npm run build` - Build for production (includes SSR + pre-rendering)
- `npm run preview` - Preview production build
- `npm run optimize-images` - Optimize images for web

## Vercel Deployment

The project is configured for Vercel deployment with:
- Pre-rendered HTML pages
- Asset caching with immutable headers
- SPA fallback rewrites
- Sitemap and robots.txt

### Deploy Steps
1. Push to GitHub/GitLab
2. Connect repository to Vercel
3. Deploy (auto-detects configuration from vercel.json)

## Environment Variables

- `VITE_API_KEY` - Gemini API key for AI-powered daily specials (optional)
- `SITE_URL` - Production site URL for sitemap generation

## Recent Changes

- Restructured project to client/server architecture
- Added SSR/SSG support with pre-rendering
- Configured Tailwind CSS with custom theme
- Added Vercel deployment configuration
- Created build pipeline with sitemap generation
- Moved all files from pancakehouse-main/ to root for Vercel
- Updated address: 1520 Main St W, Hamilton, ON L8S 1C8
- Updated hours: OPEN 8 AM - 2:00 PM Daily
- Optimized images for Lighthouse 100 scores
- **Dec 7, 2025**: Major Lighthouse optimization overhaul:
  - Removed CSS filters from hero image (reduced render delay)
  - Added inline critical CSS to prevent FOUC
  - Added responsive hero images (hero-400.webp for mobile)
  - Added fetchpriority="high" directly on hero img
  - Code splitting with vendor chunk for React
  - Terser minification with console/debugger removal

## Performance Features

- Hero image preload with fetchpriority="high" for fast LCP
- Responsive images with srcset (400w mobile, 600w desktop)
- WebP image format with JPEG fallback for all images
- Font preloading for Bangers with font-display: block
- Inline critical CSS in HTML to prevent FOUC
- Lazy loading with decoding="async" for below-fold images
- Explicit width/height on images to prevent CLS
- Gzip compression in production
- Long-term caching for static assets
- Code splitting: vendor chunk separates React from app code
- Terser minification removes console logs in production

## Accessibility Features

- Descriptive alt text on all images
- aria-labels on interactive elements
- SVG map has role="img" and title for screen readers
- Semantic HTML structure with proper headings
