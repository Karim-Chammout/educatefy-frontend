import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const VideoComponent = styled.video`
  width: 100%;
  max-height: 500px;
`;

export const VideoPreview = styled.video(
  () => css`
    width: 100%;
    height: 250px;
    border: 2px solid #bdbdbd;
  `,
);
