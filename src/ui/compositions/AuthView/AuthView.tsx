import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid2';
import { ReactNode } from 'react';

import sideImage from '@/assets/educatefy_background.png';

import { ContainerGrid, Wrapper } from './AuthView.style';

const AuthView = ({ children }: { children: ReactNode }) => {
  return (
    <Wrapper>
      <ContainerGrid container>
        <CssBaseline />
        <Grid
          size={{ xxs: false, sm: 4, md: 7 }}
          sx={{
            backgroundColor: '#fafafa',
            backgroundImage: `url(${sideImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid size={{ xxs: 12, sm: 8, md: 5 }}>
          <Box
            sx={{
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: 'calc(100vh - 64px)',
            }}
          >
            {children}
          </Box>
        </Grid>
      </ContainerGrid>
    </Wrapper>
  );
};

export default AuthView;
