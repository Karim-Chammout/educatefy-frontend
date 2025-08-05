import { ThemeOptions } from '@mui/material';
import { createAppTheme } from './theme';

const muiCustomTheme = (
  mode: 'light' | 'dark' = 'light',
  direction?: 'ltr' | 'rtl',
): ThemeOptions => {
  const appTheme = createAppTheme(mode);
  const isLight = mode === 'light';

  return {
    direction,
    palette: {
      mode,
      primary: {
        main: appTheme.colors.primary[500],
        light: appTheme.colors.primary[300],
        dark: appTheme.colors.primary[700],
        contrastText: isLight ? '#FFFFFF' : appTheme.colors.gray[900],
      },
      secondary: {
        main: appTheme.colors.secondary[500],
        light: appTheme.colors.secondary[300],
        dark: appTheme.colors.secondary[700],
        contrastText: '#FFFFFF',
      },
      error: {
        main: appTheme.colors.error[500],
        light: appTheme.colors.error[300],
        dark: appTheme.colors.error[700],
        contrastText: '#FFFFFF',
      },
      warning: {
        main: appTheme.colors.warning[500],
        light: appTheme.colors.warning[300],
        dark: appTheme.colors.warning[700],
        contrastText: appTheme.colors.gray[900],
      },
      success: {
        main: appTheme.colors.success[500],
        light: appTheme.colors.success[300],
        dark: appTheme.colors.success[700],
        contrastText: '#FFFFFF',
      },
      background: {
        default: appTheme.colors.background.default,
        paper: appTheme.colors.background.paper,
      },
      text: {
        primary: appTheme.colors.text.primary,
        secondary: appTheme.colors.text.secondary,
        disabled: appTheme.colors.text.disabled,
      },
      divider: appTheme.colors.divider,
      grey: {
        50: appTheme.colors.gray[50],
        100: appTheme.colors.gray[100],
        200: appTheme.colors.gray[200],
        300: appTheme.colors.gray[300],
        400: appTheme.colors.gray[400],
        500: appTheme.colors.gray[500],
        600: appTheme.colors.gray[600],
        700: appTheme.colors.gray[700],
        800: appTheme.colors.gray[800],
        900: appTheme.colors.gray[900],
      },
    },
    breakpoints: {
      values: {
        xxs: 0,
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
            boxShadow: 'none',
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: appTheme.colors.gray[200],
            color: appTheme.colors.text.primary,
          },
          arrow: {
            color: appTheme.colors.gray[200],
          },
        },
      },
    },
  };
};

export default muiCustomTheme;
