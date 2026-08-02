import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Image = styled.img(
  () => css`
    max-width: 100%;
    height: auto;
    border-radius: 4px;
    cursor: zoom-in;
    display: block;
  `,
);

export const ImagePreview = styled.img(
  () => css`
    max-width: 100%;
    height: auto;
    border: 2px solid #bdbdbd;
    border-radius: 4px;
    display: block;
  `,
);

export const LightboxOverlay = styled.div(
  () => css`
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.85);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1300;
    cursor: zoom-out;
    padding: 24px;
  `,
);

export const LightboxImage = styled.img(
  () => css`
    max-width: 100%;
    max-height: 100%;
    border-radius: 4px;
    cursor: default;
  `,
);
