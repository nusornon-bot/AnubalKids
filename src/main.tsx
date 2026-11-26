import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ErrorBoundary } from './components/ErrorBoundary';

// Safely register PWA Service Worker only in production when supported
if (
  import.meta.env.PROD &&
  typeof window !== 'undefined' &&
  'serviceWorker' in navigator &&
  window.location.protocol === 'https:'
) {
  import('virtual:pwa-register')
    .then(({ registerSW }) => {
      registerSW({
        immediate: false,
        onNeedRefresh() {
          console.log('New app content available.');
        },
        onOfflineReady() {
          console.log('App is ready for offline play.');
        },
      });
    })
    .catch((err) => {
      console.warn('PWA registration skipped in current environment:', err);
    });
}

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>
  );
}
