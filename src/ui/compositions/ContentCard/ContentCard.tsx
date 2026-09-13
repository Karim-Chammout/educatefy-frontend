import PersonOutlineIcon from '@mui/icons-material/PersonOutlined';
import Avatar from '@mui/material/Avatar';
import CardMedia from '@mui/material/CardMedia';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { CourseLevel, CourseStatus, ProgramLevel } from '@/generated/graphql';
import { Typography } from '@/ui/components';

import {
  CardActionArea,
  CompletedCheckIcon,
  CompletedChip,
  CompletedOverlay,
  DifficultyChip,
  MetadataContainer,
  ProgressBarWrapper,
  ProgressPercentLabel,
  StarIcon,
  Statistic,
  StatsContainer,
  StyledCard,
  StyledCardContent,
  StyledMediaWrapper,
  StyledProgressBar,
  TeacherContainer,
} from './ContentCard.style';

type ContentCardProgress = {
  completedComponents: number;
  totalComponents: number;
  progressPercentage: number;
  isCompleted: boolean;
};

type ContentCardType = {
  type: 'course' | 'program';
  title: string;
  linkPath: string;
  teacherName: string;
  teacherAvatar: string;
  image: string;
  studentsCount: number;
  difficulty: CourseLevel | ProgramLevel;
  rating?: number;
  coursesCount?: number;
  status?: CourseStatus;
  progress?: ContentCardProgress | null;
};

const ContentCard = ({
  type,
  title,
  linkPath,
  image,
  rating,
  studentsCount,
  teacherAvatar,
  teacherName,
  difficulty,
  coursesCount,
  status,
  progress,
}: ContentCardType) => {
  const { t } = useTranslation();

  const showCompletedChip = type === 'course' && status === CourseStatus.Completed;
  const showProgressBar =
    type === 'course' &&
    status === CourseStatus.Enrolled &&
    progress != null &&
    progress.progressPercentage > 0;

  return (
    <StyledCard variant="outlined" contentType={type} completed={showCompletedChip}>
      <CardActionArea LinkComponent={Link} to={linkPath}>
        <StyledMediaWrapper>
          <CardMedia component="img" loading="lazy" height="200" image={image} alt={title} />
          {showCompletedChip && (
            <>
              <CompletedOverlay>
                <CompletedCheckIcon />
              </CompletedOverlay>
              <CompletedChip size="small" label={t('contentCard.completed')} />
            </>
          )}
        </StyledMediaWrapper>

        <StyledCardContent>
          <MetadataContainer>
            {type === 'course' ? (
              <DifficultyChip difficulty={difficulty} label={difficulty} size="small" />
            ) : (
              <div style={{ display: 'flex', gap: '8px' }}>
                <DifficultyChip difficulty={difficulty} label={difficulty} size="small" />
                <DifficultyChip
                  difficulty={CourseLevel.Beginner}
                  label={t('courses.count', { count: coursesCount })}
                  size="small"
                  isProgramChip
                />
              </div>
            )}
            <StatsContainer>
              <Statistic>
                <PersonOutlineIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {studentsCount}
                </Typography>
              </Statistic>
              {rating !== undefined && rating > 0 && (
                <Statistic>
                  <StarIcon />
                  <Typography variant="body2" color="text.secondary">
                    {rating.toFixed(1)}
                  </Typography>
                </Statistic>
              )}
            </StatsContainer>
          </MetadataContainer>

          <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>

          <TeacherContainer>
            <Avatar src={teacherAvatar} alt={teacherName} sx={{ width: 24, height: 24 }} />
            <Typography variant="body2" color="primary" sx={{ fontWeight: 500 }}>
              {teacherName}
            </Typography>
          </TeacherContainer>

          {showProgressBar && (
            <ProgressBarWrapper>
              <StyledProgressBar variant="determinate" value={progress.progressPercentage} />
              <ProgressPercentLabel>
                <Typography variant="caption" color="text.secondary">
                  {Math.round(progress.progressPercentage)}%
                </Typography>
              </ProgressPercentLabel>
            </ProgressBarWrapper>
          )}
        </StyledCardContent>
      </CardActionArea>
    </StyledCard>
  );
};

export default ContentCard;
