import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const AudioComponent = styled.audio(
  () => css`
    width: 100%;
    max-height: 500px;
  `,
);

export const AudioPreview = styled.audio(
  () => css`
    width: 100%;
    height: 56px;
    border: 2px solid #bdbdbd;
  `,
);
