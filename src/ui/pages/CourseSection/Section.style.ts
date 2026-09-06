import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';

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

export type ComponentState = 'locked' | 'active' | 'completed' | 'required' | 'default';

export const ComponentTree = styled(Box)(
  ({ theme }) => css`
    margin-left: 16px;
    padding: 4px 0 8px 8px;
    border-left: 1px solid ${theme.colors.divider};
  `,
);

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
  position: relative;
  padding-left: 12px !important;

  ${({ isActive, isCompleted, isRequired, isAccessible }) => {
    let backgroundColor = 'inherit';

    if (!isAccessible) {
      backgroundColor = 'rgba(189, 189, 189, 0.05)';
    } else if (isActive) {
      backgroundColor = 'rgba(25, 118, 210, 0.08)';
    } else if (isCompleted) {
      backgroundColor = 'rgba(76, 175, 80, 0.05)';
    } else if (isRequired) {
      backgroundColor = 'rgba(255, 152, 0, 0.05)';
    }

    return css`
      background-color: ${backgroundColor};
    `;
  }}

  &::before {
    content: '';
    position: absolute;
    left: -9px;
    top: 50%;
    width: 9px;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.divider};
    transform: translateY(-50%);
  }

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

export const StatusDot = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'state',
})<{ state: ComponentState }>(({ state }: { state: ComponentState }) => {
  let backgroundColor = 'transparent';
  let border = '1px solid #bdbdbd';

  if (state === 'active') {
    backgroundColor = '#1976d2';
    border = 'none';
  } else if (state === 'completed') {
    backgroundColor = '#4caf50';
    border = 'none';
  } else if (state === 'required') {
    backgroundColor = '#ff9800';
    border = 'none';
  } else if (state === 'locked') {
    backgroundColor = '#bdbdbd';
    border = 'none';
  }

  return css`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
    margin-right: 10px;
    background-color: ${backgroundColor};
    border: ${border};
  `;
});

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
