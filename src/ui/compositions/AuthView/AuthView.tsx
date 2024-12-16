import { createTheme, ThemeProvider } from '@mui/material';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid2';
import { ReactNode } from 'react';

import sideImage from '@/assets/background_logo.png';
import muiCustomTheme from '@/ui/theme/muiTheme';

import { ContainerGrid, Wrapper } from './AuthView.style';

const AuthView = ({ children }: { children: ReactNode }) => {
  // Overwriting the breakpoints in the AuthView as a workaround
  const overriteMuiTheme = createTheme({
    ...muiCustomTheme(),
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  });

  return (
    <ThemeProvider theme={overriteMuiTheme}>
      <Wrapper>
        <ContainerGrid container>
          <CssBaseline />
          <Grid
            size={{ xs: false, sm: 4, md: 7 }}
            sx={{
              backgroundColor: '#fafafa',
              backgroundImage: `url(${sideImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid size={{ xs: 12, sm: 8, md: 5 }}>
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
    </ThemeProvider>
  );
};

export default AuthView;
