import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const DocumentFrame = styled.iframe(
  () => css`
    width: 100%;
    height: 600px;
    border: 1px solid #bdbdbd;
    border-radius: 4px;
  `,
);
