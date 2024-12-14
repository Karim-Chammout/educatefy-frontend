import GoogleIcon from '@mui/icons-material/Google';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import { ChangeEvent, useState } from 'react';

import { BASE_URL } from '@/layout/apolloClient';
import { Button } from '@/ui/components';

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
      {/* TODO: Render the <OIDCButtons /> component instead of the Button bellow */}
      <Button
        color="error"
        fullWidth
        variant="contained"
        sx={{ mt: 2, mb: 2 }}
        LinkComponent="a"
        href={`${BASE_URL}/api/openid/redirect/1?userRole=${userType}`}
        startIcon={<GoogleIcon />}
        disabled={userType === undefined}
      >
        Sign up with Google
      </Button>
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
