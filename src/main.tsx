import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';

import ErrorBoundary from '@/layout/ErrorBoundary';
import { Loader } from '@/ui/components';
import { AuthProvider } from '@/ui/context';

import App from './App';
import './i18n';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<Loader />}>
      <ErrorBoundary>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ErrorBoundary>
    </Suspense>
  </StrictMode>,
);
