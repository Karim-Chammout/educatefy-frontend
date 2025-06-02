import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LanguageIcon from '@mui/icons-material/Language';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import SchoolIcon from '@mui/icons-material/School';
import StarIcon from '@mui/icons-material/Star';
import Chip from '@mui/material/Chip';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';

import fallbackImage from '@/assets/background_logo.png';
import { CourseFragment } from '@/generated/graphql';
import { Typography } from '@/ui/components';

import {
  CourseHeaderWrapper,
  CourseImage,
  CourseInfo,
  CourseMeta,
  MetaItem,
  RatingContainer,
  SubjectsContainer,
} from '../Course.style';
import CourseCTA from './CourseCTA';

const CourseHeader = ({ courseInfo }: { courseInfo: CourseFragment }) => {
  const { t } = useTranslation();

  return (
    <CourseHeaderWrapper>
      <CourseInfo>
        <Typography component="h1" variant="h3" gutterBottom>
          {courseInfo.denomination}
        </Typography>
        <Typography variant="h5" gutterBottom>
          {courseInfo.subtitle}
        </Typography>

        <CourseMeta>
          <RatingContainer>
            <StarIcon color="warning" />
            <Typography variant="body1">
              {courseInfo.rating.toFixed(1)} ({courseInfo.ratingsCount} {t('course.ratings')})
            </Typography>
          </RatingContainer>

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
              Last updated {format(new Date(courseInfo.updated_at), 'M/yyyy')}
            </Typography>
          </MetaItem>
        </CourseMeta>

        <SubjectsContainer>
          {courseInfo.subjects.map((subject) => (
            <Chip key={subject.id} label={subject.denomination} />
          ))}
        </SubjectsContainer>

        <CourseCTA course={courseInfo} />
      </CourseInfo>
      <div>
        <CourseImage src={courseInfo.image || fallbackImage} alt={courseInfo.denomination} />
      </div>
    </CourseHeaderWrapper>
  );
};

export default CourseHeader;
