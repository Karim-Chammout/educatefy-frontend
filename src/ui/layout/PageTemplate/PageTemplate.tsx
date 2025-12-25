import Container from '@mui/material/Container';
import { ReactNode, Suspense, useContext } from 'react';

import { Loader, Toaster } from '@/ui/components';
import { ToasterContext } from '@/ui/context';

import { Navigation } from './composition';

const PageTemplate = ({ children }: { children: ReactNode }) => {
  const { isVisible, duration, type, text, handleCloseNotification } = useContext(ToasterContext);

  return (
    <>
      <Toaster
        isVisible={isVisible}
        duration={duration}
        handleCloseNotification={handleCloseNotification}
        type={type}
        text={text}
      />
      <Navigation />
      <Suspense fallback={<Loader />}>
        <main>
          <Container maxWidth="xxl" sx={{ mb: 8 }}>
            {children}
          </Container>
        </main>
      </Suspense>
    </>
  );
};

export default PageTemplate;
