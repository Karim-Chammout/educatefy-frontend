import { css } from '@emotion/react';
import styled from '@emotion/styled';

const wrapperStyles = css`
  svg {
    font-size: 250px;

    @media screen and (min-width: 450px) {
      font-size: 300px;
    }
  }

  min-height: calc(100vh - 56px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  padding: 0 16px;

  @media screen and (min-width: 600px) {
    min-height: calc(100vh - 64px);
  }
`;

export const Wrapper = styled('div')(wrapperStyles);
