import Container from '@mui/material/Container';
import { ReactNode, Suspense, useContext } from 'react';

import { Loader, Modal, Toaster } from '@/ui/components';
import { AuthContext, ToasterContext } from '@/ui/context';
import LoginPopup from '@/ui/pages/Login/LoginPopup';
import RegisterPopup from '@/ui/pages/Register/RegisterPopup';

import { PublicNavigation } from './compositions';

const PublicPageTemplate = ({ children }: { children: ReactNode }) => {
  const {
    authModal: { isAuthModalVisible, setModalVisibility, setAuthModalVisibility, authModalType },
  } = useContext(AuthContext);
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
      <PublicNavigation />
      <Suspense fallback={<Loader />}>
        <main>
          <Container maxWidth={false}>{children}</Container>
        </main>
        <Modal open={isAuthModalVisible} onClose={() => setModalVisibility(false)}>
          {isAuthModalVisible && authModalType === 'login' ? (
            <LoginPopup handleRegisterSwitch={() => setAuthModalVisibility('register')} />
          ) : (
            <RegisterPopup handleLoginSwitch={() => setAuthModalVisibility('login')} />
          )}
        </Modal>
      </Suspense>
    </>
  );
};

export default PublicPageTemplate;
