import GoogleIcon from '@mui/icons-material/Google';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import { BASE_URL } from '@/layout/apolloClient';
import { Button } from '@/ui/components';

const LoginPopup = ({ handleRegisterSwitch }: { handleRegisterSwitch: () => void }) => {
  return (
    <Box
      sx={{
        m: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      {/* TODO: Render the <OIDCButtons /> component instead of the Button bellow */}
      <Button
        color="error"
        fullWidth
        variant="contained"
        sx={{ mt: 2, mb: 2 }}
        LinkComponent="a"
        href={`${BASE_URL}/api/openid/redirect/1`}
        startIcon={<GoogleIcon />}
      >
        Continue with Google
      </Button>
      <Typography variant="body1">
        Don't have an account?{' '}
        <Link sx={{ cursor: 'pointer' }} onClick={handleRegisterSwitch}>
          Sign Up
        </Link>
      </Typography>
    </Box>
  );
};

export default LoginPopup;
