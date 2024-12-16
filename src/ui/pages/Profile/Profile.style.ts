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

const buttonWrapperStyles = css`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;

  ${min(
    'xs',
    `
      flex-wrap: nowrap;
  `,
  )}
`;

export const InfoItem = styled('div')(infoItemStyles);
export const ButtonsWrapper = styled('div')(buttonWrapperStyles);
