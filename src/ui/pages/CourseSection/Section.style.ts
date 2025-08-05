import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';

import { Typography } from '@/ui/components';
import { min } from '@/utils/mediaQuery';
import { ThemeType } from '@/ui/theme/theme';

export const SectionContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  margin-left: -16px;
  margin-right: -16px;

  ${min(
    'md',
    `
      margin: 0;
      flex-direction: row;
    `,
  )}
`;

export const NavigationPanel = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'mobileOpen',
})<{ mobileOpen: boolean }>(
  ({ theme, mobileOpen }: { theme: ThemeType; mobileOpen: boolean }) => css`
    width: 100%;
    overflow-y: auto;
    display: ${mobileOpen === false ? 'none' : 'block'};

    ${min(
      'md',
      `
      border-right: 1px solid ${theme.colors.divider};
      width: 300px;
      display: block;
      flex-shrink: 0;
    `,
    )}
  `,
);

export const ItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'isActive' && prop !== 'isCompleted',
})<{ isActive: boolean; isCompleted: boolean }>`
  border-left: 3px solid
    ${({ isActive, isCompleted }) =>
      isActive ? '#1976d2' : isCompleted ? '#4caf50' : 'transparent'};
  background-color: ${({ isActive, isCompleted }) =>
    isActive ? 'rgba(25, 118, 210, 0.08)' : isCompleted ? 'rgba(76, 175, 80, 0.05)' : 'inherit'};
  padding: 12px 16px;

  &:hover {
    background-color: ${({ isActive, isCompleted }) =>
      isActive
        ? 'rgba(25, 118, 210, 0.12)'
        : isCompleted
          ? 'rgba(76, 175, 80, 0.08)'
          : 'rgba(0, 0, 0, 0.04)'};
  }
`;

export const ComponentButton = styled(ListItemButton, {
  shouldForwardProp: (prop) =>
    prop !== 'isActive' &&
    prop !== 'isCompleted' &&
    prop !== 'isRequired' &&
    prop !== 'isAccessible',
})<{
  isActive: boolean;
  isCompleted: boolean;
  isRequired: boolean;
  isAccessible: boolean;
}>`
  padding-left: 32px !important;

  ${({ isActive, isCompleted, isRequired, isAccessible }) => {
    let borderColor = 'transparent';
    let backgroundColor = 'inherit';

    if (!isAccessible) {
      borderColor = '#bdbdbd';
      backgroundColor = 'rgba(189, 189, 189, 0.05)';
    } else if (isActive) {
      borderColor = '#1976d2';
      backgroundColor = 'rgba(25, 118, 210, 0.08)';
    } else if (isCompleted) {
      borderColor = '#4caf50';
      backgroundColor = 'rgba(76, 175, 80, 0.05)';
    } else if (isRequired) {
      borderColor = '#ff9800';
      backgroundColor = 'rgba(255, 152, 0, 0.05)';
    }

    return css`
      border-left: 3px solid ${borderColor};
      background-color: ${backgroundColor};
    `;
  }}

  &:hover:not(:disabled) {
    background-color: ${({ isActive, isCompleted, isRequired, isAccessible }) => {
      if (!isAccessible) return 'rgba(189, 189, 189, 0.08)';
      if (isActive) return 'rgba(25, 118, 210, 0.12)';
      if (isCompleted) return 'rgba(76, 175, 80, 0.08)';
      if (isRequired) return 'rgba(255, 152, 0, 0.08)';

      return 'rgba(0, 0, 0, 0.04)';
    }};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    color: #757575;
  }
`;

export const ContentArea = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'fullWidth',
})<{ fullWidth?: boolean }>`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  width: 100%;

  img {
    max-width: 100%;
    height: auto;
  }

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      ${min(
        'md',
        `
        display: none;
      `,
      )}
    `}
`;

export const VideoComponent = styled.video`
  width: 100%;
  max-height: 500px;
`;

export const TextContent = styled(Typography)`
  white-space: pre-wrap;
  line-height: 1.6;
`;

export const MobileMenuButton = styled(Box)(
  ({ theme }: { theme: ThemeType }) => css`
    display: flex;
    align-items: center;
    padding: 12px 16px;
    cursor: pointer;
    background-color: ${theme.colors.background.elevated};
    border-bottom: 1px solid ${theme.colors.divider};

    ${min(
      'md',
      `
      display: none;
    `,
    )}
  `,
);
