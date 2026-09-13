import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import MuiCheckCircleIcon from '@mui/icons-material/CheckCircle';
import MuiStarIcon from '@mui/icons-material/Star';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import MuiCardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import { styled as MuiStyled } from '@mui/material/styles';

import { CourseLevel, ProgramLevel } from '@/generated/graphql';
import { ThemeType } from '@/ui/theme/theme';

type ContentType = 'course' | 'program';

const cardStyles = ({
  theme,
  contentType,
  completed,
}: {
  theme: ThemeType;
  contentType: ContentType;
  completed?: boolean;
}) => css`
  min-width: 280px;
  width: 100%;
  max-width: 420px;
  border-radius: 4px;
  height: 100%;
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease;

  ${completed &&
  css`
    background-color: ${theme.colors.success['50']};
  `}

  ${contentType === 'program' &&
  !completed &&
  css`
    border-left: 2px solid ${theme.colors.error['500']};
  `}

  & .MuiCardActionArea-root {
    height: 100%;
    padding: 16px;
  }

  &:hover {
    border-color: ${completed
      ? theme.colors.success['500']
      : contentType === 'course'
        ? theme.colors.primary['500']
        : theme.colors.error['500']};
  }
`;

const mediaWrapperStyles = css`
  position: relative;
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

const completedChipStyles = ({ theme }: { theme: ThemeType }) => css`
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 2;
  background-color: ${theme.colors.success['500']};
  color: #fff;
  font-weight: 600;
  font-size: 12px;
`;

const completedOverlayStyles = css`
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const completedCheckIconStyles = ({ theme }: { theme: ThemeType }) => css`
  color: rgba(255, 255, 255, 0.85);
  font-size: 48px;
  filter: drop-shadow(0 1px 4px ${theme.colors.gray['900']});
`;

const progressBarWrapperStyles = css`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
`;

const progressPercentLabelStyles = css`
  white-space: nowrap;
`;

export const CardActionArea = styled(MuiCardActionArea)<{ to: string }>();
export const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'contentType' && prop !== 'completed',
})<{ contentType: ContentType; completed?: boolean }>(cardStyles);
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
export const CompletedChip = styled(Chip)(completedChipStyles);
export const CompletedOverlay = styled(Box)(completedOverlayStyles);
export const CompletedCheckIcon = styled(MuiCheckCircleIcon)(completedCheckIconStyles);
export const ProgressBarWrapper = styled(Box)(progressBarWrapperStyles);
export const ProgressPercentLabel = styled(Box)(progressPercentLabelStyles);
export const StyledProgressBar = MuiStyled(LinearProgress)(({ theme }) => ({
  flex: 1,
  height: 4,
  borderRadius: 2,
  backgroundColor: theme.palette.grey[200],
  '& .MuiLinearProgress-bar': {
    borderRadius: 2,
    backgroundColor: theme.palette.success.main,
  },
}));
