import { renderToString } from 'react-dom/server';
import { StrictMode } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import App from './App';

export function render(url: string) {
  return renderToString(
    <StrictMode>
      <App />
      <Analytics />
      <SpeedInsights />
    </StrictMode>
  );
}
