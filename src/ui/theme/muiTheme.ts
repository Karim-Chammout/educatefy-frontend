import { ThemeOptions } from '@mui/material';

import theme from './theme';

const muiCustomTheme = (direction?: 'ltr' | 'rtl'): ThemeOptions => {
  return {
    direction,
    palette: {
      primary: {
        main: theme.colors.blue,
      },
    },
    breakpoints: {
      values: {
        xs: 360,
        sm: 768,
        md: 990,
        lg: 1200,
        xl: 1400,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
        },
      },
    },
  };
};

export default muiCustomTheme;
