import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { min } from '@/utils/mediaQuery';

const dashboardStyles = css`
  display: flex;
  gap: 8px;
  margin-top: 8px;
  min-height: 100vh;
`;

const sidebarStyles = css`
  width: 56px;
  flex-shrink: 0;
  overflow: hidden;
  border-right: 1px solid rgba(0, 0, 0, 0.12);

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
