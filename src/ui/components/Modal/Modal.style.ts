import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { max } from '@/utils/mediaQuery';

const boxStyles = css`
  background: #fff;
  width: 400px;
  height: 100%;
  overflow-y: scroll;
  border: 2px solid #000;
  padding: 32px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  ${max(
    'sm',
    `
    width: calc(100% - 50px);
    max-width: 400px;
  `,
  )}

  ${max(
    'xs',
    `
    max-height: calc(100% - 100px);
  `,
  )}
`;

export const StyledBox = styled('div')(boxStyles);
