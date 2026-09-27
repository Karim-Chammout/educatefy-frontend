import { useTranslation } from 'react-i18next';

import { HomeCourseFragment, HomeQuery, StatisticsFragment } from '@/generated/graphql';
import { Typography } from '@/ui/components';

import { CoursesSection, Statistics, TeachersFeedSection } from './composition';
import { Header } from './Home.style';

const Home = ({
  enrolledCourses,
  completedCourses,
  teacherFeed,
  statistics,
}: {
  enrolledCourses: HomeCourseFragment[];
  completedCourses: HomeCourseFragment[];
  teacherFeed: HomeQuery['followingFeedByTeachers'];
  statistics: StatisticsFragment | null | undefined;
}) => {
  const { t } = useTranslation();

  return (
    <div style={{ marginTop: '16px' }}>
      <Header>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold' }} gutterBottom>
          {t('home.hey')}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {t('home.goodToSeeYou')}
        </Typography>
      </Header>

      {statistics && <Statistics statistics={statistics} />}

      {enrolledCourses.length > 0 && (
        <CoursesSection title={t('home.enrolledContentsContinue')} courses={enrolledCourses} />
      )}

      {teacherFeed.length > 0 && (
        <TeachersFeedSection title={t('home.fromYourTeachers')} blocks={teacherFeed} />
      )}

      {completedCourses.length > 0 && (
        <CoursesSection title={t('home.yourCompletedContents')} courses={completedCourses} />
      )}
    </div>
  );
};

export default Home;
