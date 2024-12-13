const colors = {
  /* TODO: Add color palette later */
  blue: '#21458C', // placeholder color
};

const theme = {
  colors: { ...colors },
  breakpoint: {
    xs: 360,
    sm: 768,
    md: 990,
    lg: 1200,
    xlg: 1400,
  },
};

export default theme;

export type ThemeType = typeof theme;
