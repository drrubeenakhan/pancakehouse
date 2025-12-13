import { hydrateRoot, createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root')!;
const hasSSRContent = rootElement.innerHTML.trim() && !rootElement.innerHTML.includes('<!--app-html-->');

if (hasSSRContent) {
  hydrateRoot(
    rootElement,
    <StrictMode>
      <App />
      <Analytics />
      <SpeedInsights />
    </StrictMode>
  );
} else {
  rootElement.innerHTML = '';
  createRoot(rootElement).render(
    <StrictMode>
      <App />
      <Analytics />
      <SpeedInsights />
    </StrictMode>
  );
}
