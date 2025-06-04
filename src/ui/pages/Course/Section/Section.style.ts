import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';

import { Typography } from '@/ui/components';
import { min } from '@/utils/mediaQuery';

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
})<{ mobileOpen?: boolean }>`
  width: 100%;
  border-right: 1px solid #e0e0e0;
  overflow-y: auto;
  display: ${({ mobileOpen }) => (mobileOpen === false ? 'none' : 'block')};

  ${min(
    'md',
    `
      width: 300px;
      display: block;
      flex-shrink: 0;
    `,
  )}
`;

export const ItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive: boolean }>`
  border-left: 3px solid ${({ isActive }) => (isActive ? '#1976d2' : 'transparent')};
  background-color: ${({ isActive }) => (isActive ? 'rgba(25, 118, 210, 0.08)' : 'inherit')};
  padding: 12px 16px;
`;

export const ComponentButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive: boolean }>`
  padding-left: 32px !important;
  border-left: 3px solid ${({ isActive }) => (isActive ? '#1976d2' : 'transparent')};
  background-color: ${({ isActive }) => (isActive ? 'rgba(25, 118, 210, 0.08)' : 'inherit')};
`;

export const ContentArea = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'fullWidth',
})<{ fullWidth?: boolean }>`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  width: 100%;

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

export const MobileMenuButton = styled(Box)`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  background-color: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;

  ${min(
    'md',
    `
      display: none;
    `,
  )}
`;
