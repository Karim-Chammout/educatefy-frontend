import Button from '@mui/material/Button';
import { ReactNode } from 'react';

import { Typography } from '@/ui/components';

import { Wrapper } from './InfoState.style';

type InfoStateType = {
  icon: ReactNode;
  title: string;
  subtitle: string;
  btnOnClick: () => void;
  btnLabel: string;
};

const InfoState = ({ title, icon, subtitle, btnOnClick, btnLabel }: InfoStateType) => {
  return (
    <Wrapper>
      {icon}
      <Typography component="h1" variant="h4" sx={{ my: 1 }}>
        {title}
      </Typography>
      <Typography>{subtitle}</Typography>
      <Button variant="contained" onClick={btnOnClick} sx={{ mt: 2 }}>
        {btnLabel}
      </Button>
    </Wrapper>
  );
};

export default InfoState;
