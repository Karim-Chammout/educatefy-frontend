const lightColors = {
  primary: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
  },

  secondary: {
    50: '#F0F4F8',
    100: '#D9E6F2',
    200: '#B3CCE6',
    300: '#8DB3D9',
    400: '#6799CC',
    500: '#4080BF',
    600: '#335B8F',
    700: '#2A4B75',
    800: '#213B5C',
    900: '#182B42',
  },

  gray: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },

  success: {
    50: '#F0F9F4',
    100: '#DCF2E4',
    200: '#BBE5CC',
    300: '#8FD4A8',
    400: '#5CBE7D',
    500: '#34A853',
    600: '#2D8F47',
    700: '#26763C',
    800: '#1F5D31',
    900: '#1A4A28',
  },

  warning: {
    50: '#FFFEF7',
    100: '#FEFCE8',
    200: '#FEF7CD',
    300: '#FEEF9A',
    400: '#FDE047',
    500: '#FBBC05',
    600: '#D9A005',
    700: '#B68404',
    800: '#936803',
    900: '#785502',
  },

  error: {
    50: '#FEF7F7',
    100: '#FDEAEA',
    200: '#FAD2D2',
    300: '#F5ABAB',
    400: '#EE7A7A',
    500: '#EA4335',
    600: '#D73A2A',
    700: '#C13020',
    800: '#A02818',
    900: '#842114',
  },

  background: {
    default: '#FFFFFF',
    paper: '#FFFFFF',
    elevated: '#F8F9FA',
    surface: '#F5F6F7',
  },

  text: {
    primary: '#1A1A1A',
    secondary: '#666666',
    disabled: '#9E9E9E',
    hint: '#BDBDBD',
  },

  divider: '#E0E0E0',
  border: '#E5E7EB',
};

const darkColors = {
  primary: {
    50: '#1E3A8A',
    100: '#1E40AF',
    200: '#1D4ED8',
    300: '#2563EB',
    400: '#3B82F6',
    500: '#3B82F6',
    600: '#60A5FA',
    700: '#93C5FD',
    800: '#BFDBFE',
    900: '#EFF6FF',
  },

  secondary: {
    50: '#0F1A26',
    100: '#142033',
    200: '#1A2840',
    300: '#21304D',
    400: '#29385A',
    500: '#334666',
    600: '#4080BF',
    700: '#6799CC',
    800: '#8DB3D9',
    900: '#D9E6F2',
  },

  gray: {
    50: '#0A0A0A',
    100: '#171717',
    200: '#262626',
    300: '#404040',
    400: '#525252',
    500: '#737373',
    600: '#A3A3A3',
    700: '#D4D4D4',
    800: '#E5E5E5',
    900: '#F5F5F5',
  },

  success: {
    50: '#0D1F12',
    100: '#112A17',
    200: '#16351D',
    300: '#1B4023',
    400: '#204B2A',
    500: '#22C55E',
    600: '#4ADE80',
    700: '#86EFAC',
    800: '#BBF7D0',
    900: '#DCFCE7',
  },

  warning: {
    50: '#1F1A0D',
    100: '#2A2211',
    200: '#352A15',
    300: '#40321A',
    400: '#4B3A1F',
    500: '#FCD34D',
    600: '#FDE68A',
    700: '#FEF3C7',
    800: '#FFFBEB',
    900: '#FFFEF7',
  },

  error: {
    50: '#1F0D0D',
    100: '#2A1111',
    200: '#351515',
    300: '#401A1A',
    400: '#4B1F1F',
    500: '#F87171',
    600: '#FCA5A5',
    700: '#FED7D7',
    800: '#FEE2E2',
    900: '#FEF2F2',
  },

  background: {
    default: '#0A0A0A',
    paper: '#171717',
    elevated: '#262626',
    surface: '#1F1F1F',
  },

  text: {
    primary: '#F5F5F5',
    secondary: '#A3A3A3',
    disabled: '#525252',
    hint: '#404040',
  },

  divider: '#404040',
  border: '#2D2D2D',
};

const commonTheme = {
  breakpoint: {
    xs: 360,
    sm: 768,
    md: 990,
    lg: 1200,
    xlg: 1400,
  },
};

const createAppTheme = (mode: 'light' | 'dark' = 'light') => ({
  ...commonTheme,
  mode,
  colors: mode === 'light' ? lightColors : darkColors,
});

// Default to light theme
const theme = createAppTheme('light');

export default theme;
export { createAppTheme, lightColors, darkColors, commonTheme };
export type ThemeType = typeof theme;
