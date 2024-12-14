import { css } from '@emotion/react';

import theme, { ThemeType } from '@/ui/theme/theme';

/**
 * `min()` media query utility function
 */
export const min = (breakpoint: keyof ThemeType['breakpoint'], content: string) => {
  return css`
    @media screen and (min-width: ${(theme.breakpoint[breakpoint] + 1) / 16}em) {
      ${content}
    }
  `;
};

/**
 * `max()` media query utility function
 */
export const max = (breakpoint: keyof ThemeType['breakpoint'], content: string) => {
  return css`
    @media screen and (max-width: ${theme.breakpoint[breakpoint] / 16}em) {
      ${content}
    }
  `;
};
