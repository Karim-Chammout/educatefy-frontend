import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const EmbedFrame = styled.iframe(
  () => css`
    width: 100%;
    height: 500px;
    border: 0;
    border-radius: 4px;
  `,
);
