import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { min } from '@/utils/mediaQuery';
import { ThemeType } from '@/ui/theme/theme';

const dashboardStyles = css`
  display: flex;
  gap: 8px;
  margin-top: 8px;
  min-height: 100vh;
`;

const sidebarStyles = ({ theme }: { theme: ThemeType }) => css`
  width: 56px;
  flex-shrink: 0;
  overflow: hidden;
  border-right: 1px solid ${theme.colors.divider};

  ${min(
    'sm',
    `
    width: 240px;
    `,
  )}
`;

const mainContentStyles = css`
  flex-grow: 1;
`;

export const DashboardContainer = styled('div')(dashboardStyles);
export const Sidebar = styled('div')(sidebarStyles);
export const MainContent = styled('div')(mainContentStyles);
