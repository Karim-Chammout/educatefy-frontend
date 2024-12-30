import '@emotion/react';

import type { ThemeType } from '@/ui/theme/theme';

declare module '@emotion/react' {
  export interface Theme extends ThemeType {}
}
