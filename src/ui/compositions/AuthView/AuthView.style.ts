import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Grid from '@mui/material/Grid';

import { min } from '@/utils/mediaQuery';

const wrapperStyles = css`
  margin-left: -16px;
  margin-right: -16px;

  ${min(
    'sm',
    `
      margin-left: -24px;
      margin-right: -24px;
    `,
  )}
`;

const gridStyles = css`
  height: calc(100vh - 56px);

  ${min(
    'sm',
    `
    height: calc(100vh - 64px);
    `,
  )}
`;

export const Wrapper = styled('div')(wrapperStyles);
export const ContainerGrid = styled(Grid)(gridStyles);
