import { ReactNode, Suspense } from 'react';
import { useLocation } from 'react-router';

import ErrorBoundary from '../ErrorBoundary';
import { Loader } from '@/ui/components';
import { ErrorPlaceholder } from '@/ui/compositions';

const ErrorPlaceholderFallback = ({ reset }: { reset: () => void }) => (
  <ErrorPlaceholder onRetry={reset} />
);

const RouteWrapper = ({
  children,
  fallbackLoader,
}: {
  children: ReactNode;
  fallbackLoader?: ReactNode;
}) => {
  const { key, pathname } = useLocation();

  return (
    <ErrorBoundary key={key} resetKeys={[pathname]} fallback={ErrorPlaceholderFallback}>
      <Suspense fallback={fallbackLoader || <Loader />}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default RouteWrapper;
