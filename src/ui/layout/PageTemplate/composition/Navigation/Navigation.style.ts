import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import { NavLink } from 'react-router';

import { min } from '@/utils/mediaQuery';
import { ThemeType } from '@/ui/theme/theme';

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

const navLinkStyles = ({ theme }: { theme: ThemeType }) => css`
  color: ${theme.colors.text.primary};
  text-decoration: none;
  margin: 0 16px;
  display: flex;
  gap: 16px;
  position: relative;

  svg {
    color: ${theme.colors.text.primary};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 0;
    right: 0;
    height: 3px;
    background-color: ${theme.colors.text.primary};
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
