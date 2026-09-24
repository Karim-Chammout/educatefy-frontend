import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import MuiCardActionArea from '@mui/material/CardActionArea';
import Chip from '@mui/material/Chip';

import { ThemeType } from '@/ui/theme/theme';

const cardStyles = ({ theme }: { theme: ThemeType }) => css`
  width: 100%;
  min-width: 0;
  border-radius: 4px;
  overflow: hidden;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: ${theme.colors.primary['500']};
  }
`;

const rowStyles = css`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  min-width: 0;
  padding: 16px;
`;

const actionAreaStyles = css`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-grow: 1;
  min-width: 0;
`;

const avatarStyles = ({ theme }: { theme: ThemeType }) => css`
  flex-shrink: 0;
  width: 72px;
  height: 72px;
  box-shadow: 0 0 0 4px ${theme.colors.primary['50']};
  background-color: ${theme.colors.background.paper};
`;

const contentStyles = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  min-width: 0;
  width: 100%;
`;

const subjectsRowStyles = css`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  width: 100%;
`;

const subjectChipStyles = css`
  height: 24px;
  font-size: 12px;

  & .MuiChip-label {
    padding-left: 8px;
    padding-right: 8px;
  }
`;

const followersRowStyles = css`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const followActionStyles = css`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

export const CardActionArea = styled(MuiCardActionArea)<{ to: string }>(actionAreaStyles);
export const StyledCard = styled(Card)(cardStyles);
export const StyledRow = styled(Box)(rowStyles);
export const StyledAvatar = styled(Avatar)(avatarStyles);
export const StyledContent = styled(Box)(contentStyles);
export const SubjectsRow = styled(Box)(subjectsRowStyles);
export const SubjectChip = styled(Chip)(subjectChipStyles);
export const FollowersRow = styled(Box)(followersRowStyles);
export const StyledFollowAction = styled(Box)(followActionStyles);
