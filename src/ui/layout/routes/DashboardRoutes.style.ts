import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { ThemeType } from '@/ui/theme/theme';

const dashboardStyles = css`
  display: flex;
  gap: 8px;
  margin-top: 8px;
  min-height: 100vh;
`;

const sidebarStyles = ({ theme, width }: { theme: ThemeType; width: number }) => css`
  width: ${width}px;
  flex-shrink: 0;
  overflow: hidden;
  border-right: 1px solid ${theme.colors.divider};
  transition: width 0.3s ease;
`;

const sidebarHeaderStyles = ({ theme }: { theme: ThemeType }) => css`
  display: flex;
  padding: 8px;
  border-bottom: 1px solid ${theme.colors.divider};
`;

const mainContentStyles = css`
  flex-grow: 1;
`;

export const DashboardContainer = styled('div')(dashboardStyles);
export const Sidebar = styled('div')<{ width: number }>(sidebarStyles);
export const MainContent = styled('div')(mainContentStyles);
export const SidebarHeader = styled('div')(sidebarHeaderStyles);
