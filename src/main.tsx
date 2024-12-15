import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import { AuthProvider, ToasterProvider } from '@/ui/context';
import ErrorBoundary from '@/ui/layout/ErrorBoundary';

import App from './App';
import './i18n';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense>
      <BrowserRouter>
        <ErrorBoundary>
          <ToasterProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </ToasterProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </Suspense>
  </StrictMode>,
);
