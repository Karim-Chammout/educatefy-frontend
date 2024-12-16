import '@emotion/react';

import type { ThemeType } from '../globals/theme';

declare module '@emotion/react' {
  export interface Theme extends ThemeType {}
}
