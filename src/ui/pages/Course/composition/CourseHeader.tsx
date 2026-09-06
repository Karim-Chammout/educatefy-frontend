import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LanguageIcon from '@mui/icons-material/Language';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import PersonOutlineIcon from '@mui/icons-material/PersonOutlined';
import SchoolIcon from '@mui/icons-material/School';
import StarIcon from '@mui/icons-material/Star';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import fallbackImage from '@/assets/educatefy_background.png';
import { CourseFragment, CourseStatus } from '@/generated/graphql';
import { Typography } from '@/ui/components';

import {
  CourseHeaderWrapper,
  CourseImage,
  CourseInfo,
  CourseMeta,
  MetaItem,
  RatingContainer,
  StyledLinearProgress,
  SubjectsContainer,
} from '../Course.style';
import { useCourseProgress } from '../hooks/useCourseProgress';
import CourseCTA from './CourseCTA';

const CourseHeader = ({ courseInfo }: { courseInfo: CourseFragment }) => {
  const { t } = useTranslation();

  const isEnrolledOrCompleted =
    courseInfo.status === CourseStatus.Enrolled || courseInfo.status === CourseStatus.Completed;

  const { completedSections, totalSections, percentage } = useCourseProgress(courseInfo);

  return (
    <Paper variant="outlined" sx={{ p: 3, mb: 2 }}>
      <CourseHeaderWrapper>
        <CourseInfo>
          <Typography component="h1" variant="h3" gutterBottom>
            {courseInfo.denomination}
          </Typography>
          <Typography variant="h5" gutterBottom>
            {courseInfo.subtitle}
          </Typography>

          <CourseMeta>
            {courseInfo.rating > 0 && courseInfo.ratingsCount > 0 && (
              <RatingContainer>
                <StarIcon color="warning" />
                <Typography variant="body1">
                  {courseInfo.rating.toFixed(1)} ({courseInfo.ratingsCount} {t('course.reviews')})
                </Typography>
              </RatingContainer>
            )}

            <MetaItem>
              <PersonOutlineIcon />
              <Typography variant="body1">
                {courseInfo.participationCount} {t('course.students')}
              </Typography>
            </MetaItem>

            <MetaItem>
              <SchoolIcon />
              <Typography variant="body1">{t(`course.courseLevel.${courseInfo.level}`)}</Typography>
            </MetaItem>

            <MetaItem>
              <LanguageIcon />
              <Typography variant="body1">{courseInfo.language}</Typography>
            </MetaItem>

            {courseInfo.start_date && (
              <MetaItem>
                <CalendarTodayIcon />
                <Typography variant="body1">
                  {courseInfo.end_date
                    ? `${format(new Date(courseInfo.start_date), 'MMM dd')} - ${format(new Date(courseInfo.end_date), 'MMM dd')}`
                    : format(new Date(courseInfo.start_date), 'MMM dd')}
                </Typography>
              </MetaItem>
            )}

            <MetaItem>
              <NewReleasesIcon />
              <Typography variant="body1">
                {t('course.lastUpdated')} {format(new Date(courseInfo.updated_at), 'M/yyyy')}
              </Typography>
            </MetaItem>
          </CourseMeta>

          <SubjectsContainer>
            {courseInfo.subjects.map((subject) => (
              <Chip
                key={subject.id}
                label={subject.denomination}
                component={Link}
                to={`/subject/${subject.id}`}
                sx={{
                  '&:hover, &:focus': {
                    cursor: 'pointer',
                    background: 'rgba(0, 0, 0, 0.3)',
                  },
                }}
              />
            ))}
          </SubjectsContainer>

          {isEnrolledOrCompleted && totalSections > 0 && (
            <Box sx={{ mb: 2, maxWidth: 420 }}>
              <StyledLinearProgress variant="determinate" value={percentage} sx={{ mb: 1 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="caption" color="text.secondary">
                  {t('course.progress', {
                    completed: completedSections,
                    total: totalSections,
                  })}
                </Typography>
                <Typography variant="caption" sx={{ fontWeight: 'medium', color: 'primary.main' }}>
                  {Math.round(percentage)}%
                </Typography>
              </Box>
            </Box>
          )}

          <CourseCTA course={courseInfo} />
        </CourseInfo>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <CourseImage src={courseInfo.image || fallbackImage} alt={courseInfo.denomination} />
        </div>
      </CourseHeaderWrapper>
    </Paper>
  );
};

export default CourseHeader;
