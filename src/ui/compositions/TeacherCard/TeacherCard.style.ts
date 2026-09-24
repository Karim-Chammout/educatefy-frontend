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
  max-width: 320px;
  min-width: 0;
  min-height: 248px;
  height: 100%;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: border-color 0.2s ease;

  & .MuiCardActionArea-root {
    flex-grow: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0;
  }

  &:hover {
    border-color: ${theme.colors.primary['500']};
  }
`;

const bodyStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  flex-grow: 1;
  padding: 28px 16px 20px;
`;

const avatarStyles = ({ theme }: { theme: ThemeType }) => css`
  flex-shrink: 0;
  width: 88px;
  height: 88px;
  box-shadow: 0 0 0 4px ${theme.colors.primary['50']};
  background-color: ${theme.colors.background.paper};
`;

const contentStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;
  margin-top: 16px;
`;

const subjectsRowStyles = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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

const followersContainerStyles = ({ theme }: { theme: ThemeType }) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  padding: 12px 16px;
  background-color: ${theme.colors.gray['50']};
  border-top: 1px solid ${theme.colors.divider};
`;

export const CardActionArea = styled(MuiCardActionArea)<{ to: string }>();
export const StyledCard = styled(Card)(cardStyles);
export const StyledBody = styled(Box)(bodyStyles);
export const StyledAvatar = styled(Avatar)(avatarStyles);
export const StyledContent = styled(Box)(contentStyles);
export const SubjectsRow = styled(Box)(subjectsRowStyles);
export const SubjectChip = styled(Chip)(subjectChipStyles);
export const FollowersContainer = styled(Box)(followersContainerStyles);
