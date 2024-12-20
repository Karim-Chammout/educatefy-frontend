import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { Typography } from '@/ui/components';
import { AuthView } from '@/ui/compositions';
import OIDCButtons from '@/ui/compositions/AuthView/OIDCButtons';

const Register = () => {
  const { t } = useTranslation();
  const [userType, setUserType] = useState<'student' | 'teacher' | undefined>(undefined);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserType(event.target.value as 'student' | 'teacher');
  };

  return (
    <AuthView>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        {t('register.signUp')}
      </Typography>
      <RadioGroup
        aria-labelledby="user-type-radio-buttons-group-label"
        name="user-type"
        onChange={handleChange}
        sx={{ my: 3 }}
      >
        <Alert
          icon={false}
          severity={userType === undefined ? 'warning' : 'success'}
          sx={{ m: 'auto' }}
        >
          <Typography sx={{ fontWeight: 'bold' }}>{t('register.selectUserRole')}</Typography>
        </Alert>
        <div style={{ display: 'flex' }}>
          <FormControlLabel value="student" control={<Radio />} label={t('register.student')} />
          <FormControlLabel value="teacher" control={<Radio />} label={t('register.teacher')} />
        </div>
      </RadioGroup>
      <OIDCButtons userType={userType} disabled={userType === undefined} isRegister />
      <Typography variant="body1">
        {t('register.alreadyHaveAccount')} <Link to="/login">{t('register.login')}</Link>
      </Typography>
    </AuthView>
  );
};

export default Register;
