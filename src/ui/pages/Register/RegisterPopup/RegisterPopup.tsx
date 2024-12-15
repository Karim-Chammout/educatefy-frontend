import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { ChangeEvent, useState } from 'react';

import { Typography } from '@/ui/components';
import OIDCButtons from '@/ui/compositions/AuthView/OIDCButtons';

const RegisterPopup = ({ handleLoginSwitch }: { handleLoginSwitch: () => void }) => {
  const [userType, setUserType] = useState<'student' | 'teacher' | undefined>(undefined);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserType(event.target.value as 'student' | 'teacher');
  };

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
      <Typography component="h1" variant="h4">
        Sign up
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
          <Typography sx={{ fontWeight: 'bold' }}>Select a user role:</Typography>
        </Alert>
        <div style={{ display: 'flex' }}>
          <FormControlLabel value="student" control={<Radio />} label="Student" />
          <FormControlLabel value="teacher" control={<Radio />} label="Teacher" />
        </div>
      </RadioGroup>
      <OIDCButtons userType={userType} disabled={userType === undefined} isRegister />
      <Typography variant="body1">
        Already have an account?{' '}
        <Link sx={{ cursor: 'pointer' }} onClick={handleLoginSwitch}>
          Login
        </Link>
      </Typography>
    </Box>
  );
};

export default RegisterPopup;
