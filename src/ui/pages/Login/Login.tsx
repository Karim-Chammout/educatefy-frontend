import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router';

import { Typography } from '@/ui/components';
import { AuthView } from '@/ui/compositions';
import OIDCButtons from '@/ui/compositions/AuthView/OIDCButtons';
import { ToasterContext } from '@/ui/context';
import { ACCESS_DENIED } from '@/utils/constants';

const Login = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { setToasterVisibility } = useContext(ToasterContext);

  useEffect(() => {
    // Display a toaster when a user tries to access a private page without logging in.
    if (location.state?.action === ACCESS_DENIED) {
      setToasterVisibility({
        newDuration: 5000,
        newType: 'error',
        newText: t('login.accessDenied'),
      });
    }
  }, [location.state?.action, setToasterVisibility, t]);

  return (
    <AuthView>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h4">
        {t('login.signIn')}
      </Typography>
      <OIDCButtons />
      <Typography variant="body1">
        {t('login.noAccount')} <Link to="/register">{t('login.signUp')}</Link>
      </Typography>
    </AuthView>
  );
};

export default Login;
