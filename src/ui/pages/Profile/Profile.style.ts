import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { min } from '@/utils/mediaQuery';

const infoItemStyles = css`
  width: calc(100% - 32px);

  ${min(
    'sm',
    `
      width: calc(50% - 32px);
  `,
  )}
`;

export const InfoItem = styled('div')(infoItemStyles);
