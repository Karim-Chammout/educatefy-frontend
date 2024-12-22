import { ReactNode, Suspense } from 'react';

import ErrorBoundary from '../ErrorBoundary';
import { Loader } from '@/ui/components';
import { ErrorPlaceholder } from '@/ui/compositions';

const RouteWrapper = ({
  children,
  fallbackLoader,
}: {
  children: ReactNode;
  fallbackLoader?: ReactNode;
}) => {
  return (
    <ErrorBoundary fallback={<ErrorPlaceholder />}>
      <Suspense fallback={fallbackLoader || <Loader />}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default RouteWrapper;
