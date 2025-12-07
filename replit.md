# Pancake House - West Hamilton

## Overview

A 90s-themed breakfast restaurant website built as a static site with server-side rendering capabilities. The project showcases a single-page application for a Hamilton-based pancakehouse, featuring a retro brutalist design, menu display, and AI-generated daily specials. Built with React, TypeScript, and Vite, optimized for perfect Lighthouse scores and deployed on Vercel.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build Tool**
- React 18 with TypeScript for type-safe component development
- Vite 6 as the build tool and development server
- Single-page application (no client-side routing library used)

**Rendering Strategy**
- **Development**: Client-side rendering via Vite dev server OR Express SSR server
- **Production**: Static site generation (SSG) with pre-rendering
- Hydration-based client entry point detects SSR content and hydrates accordingly
- Server entry point uses `renderToString` for SSR/SSG output

**Styling Solution**
- Tailwind CSS 3 for utility-first styling with custom brutalist design tokens
- PostCSS with autoprefixer for vendor prefixing
- Custom color palette (ph-red, ph-cream, ph-yellow, ph-teal, ph-black)
- Custom utilities: hard shadows, display fonts (Bangers), body fonts (Public Sans)
- Font loading optimization with FOIT prevention via visibility toggling

**Component Architecture**
- Functional React components with TypeScript interfaces
- Shared component library: BrutalButton, MenuCard, Section
- Type definitions centralized in `@/types.ts`
- Constants externalized to `@/constants.ts` for menu items, rules, and reviews

**State Management**
- Local component state with React hooks (useState, useEffect, useRef)
- No global state management library used
- API calls handled at component level

### Build Pipeline

**Development Mode**
- Two dev servers available:
  - `npm run dev`: Standard Vite dev server (port 5000)
  - `npm run dev:ssr`: Express server with SSR middleware
- Hot module replacement (HMR) enabled
- TypeScript compilation in real-time

**Production Build Process**
1. **Client Build**: Vite builds static assets to `dist/public`
2. **SSR Build**: Vite builds server entry to `dist-ssr` with SSR-specific config
3. **Pre-rendering**: Node script renders all routes to static HTML using SSR bundle
4. **Sitemap Generation**: Generates XML sitemap with route metadata
5. **Image Optimization**: Sharp-based image processing (optional script)

**Build Optimizations**
- CSS code-splitting disabled for smaller initial payload
- Manual chunk splitting disabled for simpler output
- ESBuild minification with ES2020 target
- Source maps disabled in production
- Asset fingerprinting for long-term caching

### Performance Optimizations

**Loading Strategy**
- Font preconnection to Google Fonts CDN
- Font display blocking with fallback reveal after 3s
- Lazy loading for menu item images
- Compression middleware (level 6, 1KB threshold)

**Caching Strategy**
- Static assets: 1 year cache with immutable flag
- Images: 1 year cache for all formats (jpg, png, webp, svg)
- Vercel headers configured for optimal asset delivery

**Asset Optimization**
- Sharp library available for image processing
- Aspect ratio containers prevent CLS
- WebP format support for modern browsers

### Server Architecture

**Express Server (Development SSR)**
- Conditional middleware based on NODE_ENV
- Vite middleware mode in development
- Static file serving with compression in production
- Universal catch-all route for SPA behavior
- SSR template transformation via Vite in dev mode

**Static Deployment (Production)**
- Pre-rendered HTML served directly by Vercel
- No runtime server required
- Client-side hydration for interactivity
- Fallback to client-side rendering if SSR fails

### Path Resolution

**TypeScript Path Aliases**
- `@/*`: Maps to `./client/src/*`
- `@shared/*`: Maps to `./shared/*`
- `@assets/*`: Maps to `./attached_assets/*`

**Build-time Resolution**
- Vite resolves aliases during bundling
- Consistent between dev and production builds

## External Dependencies

### Third-Party APIs

**Google Gemini API**
- Used for generating AI-powered daily pancake specials
- API key configured via `VITE_API_KEY` or `GEMINI_API_KEY` environment variable
- Fallback to static content if API key unavailable
- Endpoint: `generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`
- JSON response parsing with error handling

### Font Services

**Google Fonts CDN**
- Bangers font family (display typography)
- Public Sans font family (body text, weights: 400, 700, 900)
- Preconnection for performance optimization
- Display blocking strategy with timeout fallback

### Deployment Platform

**Vercel**
- Static site hosting with edge network
- Custom build command: `bash build-static.sh`
- Output directory: `dist/public`
- URL rewrites for SPA routing (`/* → /index.html`)
- Custom headers for cache control
- No serverless functions required (fully static)

### Development Tools

**Build & Development**
- Vite: Module bundler and dev server
- TypeScript: Type checking and compilation
- TSX: TypeScript execution for build scripts
- Sharp: Image optimization library

**UI & Styling**
- Tailwind CSS: Utility-first CSS framework
- PostCSS: CSS transformation
- Autoprefixer: Vendor prefix automation

**Runtime**
- Node.js: Build scripts and SSR server
- Express: Development SSR server
- Compression: Gzip middleware for Express

### SEO & Metadata

**Static Files**
- `robots.txt`: Search engine crawling directives
- `sitemap.xml`: Generated programmatically with route metadata
- Site URL: `https://pancakehouse-westhamilton.vercel.app`