import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router';

import { AuthView } from '@/ui/compositions';
import OIDCButtons from '@/ui/compositions/AuthView/OIDCButtons';
import { ToasterContext } from '@/ui/context';
import { ACCESS_DENIED } from '@/utils/enum';

const Login = () => {
  const location = useLocation();
  const { setToasterVisibility } = useContext(ToasterContext);

  useEffect(() => {
    // Display a toaster when a user tries to access a private page without logging in.
    if (location.state?.action === ACCESS_DENIED) {
      setToasterVisibility({
        newDuration: 5000,
        newType: 'error',
        newText: 'You have to login to access this page!',
      });
    }
  }, [location.state?.action]);

  return (
    <AuthView>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h4">
        Sign in
      </Typography>
      <OIDCButtons />
      <Typography variant="body1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </Typography>
    </AuthView>
  );
};

export default Login;
