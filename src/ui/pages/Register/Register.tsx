import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import { ChangeEvent, useState } from 'react';
import { Link } from 'react-router';

import { AuthView } from '@/ui/compositions';
import OIDCButtons from '@/ui/compositions/AuthView/OIDCButtons';

const Register = () => {
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
        Already have an account? <Link to="/login">Login</Link>
      </Typography>
    </AuthView>
  );
};

export default Register;
