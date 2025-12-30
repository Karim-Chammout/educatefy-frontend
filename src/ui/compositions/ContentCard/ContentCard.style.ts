import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import MuiStarIcon from '@mui/icons-material/Star';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import MuiCardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';

import { CourseLevel, ProgramLevel } from '@/generated/graphql';
import { ThemeType } from '@/ui/theme/theme';

type ContentType = 'course' | 'program';

const cardStyles = ({ theme, contentType }: { theme: ThemeType; contentType: ContentType }) => css`
  min-width: 280px;
  width: 100%;
  max-width: 420px;
  border-radius: 4px;
  height: 100%;
  transition: border-color 0.2s ease;

  ${contentType === 'program' &&
  css`
    border-left: 2px solid ${theme.colors.error['500']};
  `}

  & .MuiCardActionArea-root {
    height: 100%;
    padding: 16px;
  }

  &:hover {
    border-color: ${contentType === 'course'
      ? theme.colors.primary['500']
      : theme.colors.error['500']};
  }
`;

const mediaWrapperStyles = css`
  border-radius: 4px;
  overflow: hidden;
`;

const difficultyChipStyles = ({
  theme,
  difficulty,
  isProgramChip,
}: {
  theme: Theme;
  difficulty: CourseLevel | ProgramLevel;
  isProgramChip?: boolean;
}) => css`
  ${isProgramChip
    ? css`
        background-color: rgba(249, 115, 22, 0.1);
        color: #f97316;
      `
    : css`
        background-color: ${difficulty === CourseLevel.Beginner
          ? 'rgba(52, 168, 83, 0.1)'
          : difficulty === CourseLevel.Intermediate
            ? 'rgba(251, 188, 5, 0.1)'
            : 'rgba(234, 67, 53, 0.1)'};
        color: ${difficulty === CourseLevel.Beginner
          ? theme.colors.success['500']
          : difficulty === CourseLevel.Intermediate
            ? theme.colors.warning['500']
            : theme.colors.error['500']};
      `}
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
  color: ${theme.colors.warning['500']};
  font-size: 20px;
`;

const teacherContainerStyles = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CardActionArea = styled(MuiCardActionArea)<{ to: string }>();
export const StyledCard = styled(Card)<{ contentType: ContentType }>(cardStyles);
export const StyledMediaWrapper = styled(Box)(mediaWrapperStyles);
export const DifficultyChip = styled(Chip)<{
  difficulty: CourseLevel | ProgramLevel;
  isProgramChip?: boolean;
}>(difficultyChipStyles);
export const StyledCardContent = styled(CardContent)(cardContentStyles);
export const MetadataContainer = styled(Box)(metadataContainerStyles);
export const StatsContainer = styled(Box)(statsContainerStyles);
export const Statistic = styled(Box)(statisticStyles);
export const StarIcon = styled(MuiStarIcon)(starIconStyles);
export const TeacherContainer = styled(Box)(teacherContainerStyles);
