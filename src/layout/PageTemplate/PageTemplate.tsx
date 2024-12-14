import Container from '@mui/material/Container';
import { ReactNode, Suspense } from 'react';

import { Loader } from '@/ui/components';

import { Navigation } from './composition';

const PageTemplate = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navigation />
      <Suspense fallback={<Loader />}>
        <main>
          <Container maxWidth={false}>{children}</Container>
        </main>
      </Suspense>
    </>
  );
};

export default PageTemplate;
