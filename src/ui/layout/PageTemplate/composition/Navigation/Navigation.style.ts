import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import { NavLink } from 'react-router';

import { min } from '@/utils/mediaQuery';

const logoWrapperStyles = css`
  display: none;

  ${min(
    'sm',
    `
      display: flex;
      margin-right: 8px;
      cursor: pointer;
    `,
  )}
`;

const navLinkStyles = css`
  color: black;
  text-decoration: none;
  margin: 0 16px;
  display: flex;
  gap: 16px;
  position: relative;

  svg {
    color: #ccc;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 0;
    right: 0;
    height: 3px;
    background-color: #000;
    transform: scale(0);
    transition: transform 0.3s ease-in-out;
  }

  &:active,
  &.active {
    font-weight: bold;

    svg {
      color: unset;
    }
  }

  &.active::after {
    transform: scale(1);
  }
`;

export const LogoWrapper = styled(Box)(logoWrapperStyles);
export const StyledNavLink = styled(NavLink)(navLinkStyles);
