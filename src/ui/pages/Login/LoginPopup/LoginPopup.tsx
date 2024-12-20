import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { useTranslation } from 'react-i18next';

import { Typography } from '@/ui/components';
import OIDCButtons from '@/ui/compositions/AuthView/OIDCButtons';

const LoginPopup = ({ handleRegisterSwitch }: { handleRegisterSwitch: () => void }) => {
  const { t } = useTranslation();

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
        {t('login.signIn')}
      </Typography>
      <OIDCButtons />
      <Typography variant="body1">
        {t('login.noAccount')}{' '}
        <Link sx={{ cursor: 'pointer' }} onClick={handleRegisterSwitch}>
          {t('login.signUp')}
        </Link>
      </Typography>
    </Box>
  );
};

export default LoginPopup;
