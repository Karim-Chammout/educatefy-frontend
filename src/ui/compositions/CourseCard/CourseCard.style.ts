import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import MuiStarIcon from '@mui/icons-material/Star';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import MuiCardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';

import { CourseLevel } from '@/generated/graphql';

const cardStyles = css`
  min-width: 280px;
  width: 100%;
  max-width: 420px;
  border-radius: 16px;

  & .MuiCardActionArea-root {
    height: 100%;
    padding: 16px;
  }
`;

const mediaWrapperStyles = css`
  border-radius: 16px;
  overflow: hidden;
`;

const difficultyChipStyles = ({
  theme,
  difficulty,
}: {
  theme: Theme;
  difficulty: CourseLevel;
}) => css`
  background-color: ${difficulty === CourseLevel.Beginner
    ? 'rgba(52, 168, 83, 0.1)'
    : difficulty === CourseLevel.Intermediate
      ? 'rgba(251, 188, 5, 0.1)'
      : 'rgba(234, 67, 53, 0.1)'};
  color: ${difficulty === CourseLevel.Beginner
    ? theme.colors.successGreen
    : difficulty === CourseLevel.Intermediate
      ? theme.colors.warningYellow
      : theme.colors.errorRed};
  font-weight: 500;
  font-size: 12px;
  text-transform: capitalize;
`;

const cardContentStyles = css`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0;

  &:last-child {
    padding-bottom: 0;
  }
`;

const metadataContainerStyles = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
`;

const statsContainerStyles = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const statisticStyles = css`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const starIconStyles = ({ theme }: { theme: Theme }) => css`
  color: ${theme.colors.warningYellow};
  font-size: 20px;
`;

const teacherContainerStyles = css`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const CardActionArea = styled(MuiCardActionArea)<{ to: string }>();
export const StyledCard = styled(Card)(cardStyles);
export const StyledMediaWrapper = styled(Box)(mediaWrapperStyles);
export const DifficultyChip = styled(Chip)<{ difficulty: CourseLevel }>(difficultyChipStyles);
export const StyledCardContent = styled(CardContent)(cardContentStyles);
export const MetadataContainer = styled(Box)(metadataContainerStyles);
export const StatsContainer = styled(Box)(statsContainerStyles);
export const Statistic = styled(Box)(statisticStyles);
export const StarIcon = styled(MuiStarIcon)(starIconStyles);
export const TeacherContainer = styled(Box)(teacherContainerStyles);
