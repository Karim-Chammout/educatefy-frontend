import { useTranslation } from 'react-i18next';

import { HomeCourseFragment, StatisticsFragment } from '@/generated/graphql';
import { Typography } from '@/ui/components';

import { CoursesSection, Statistics } from './composition';
import { Header } from './Home.style';

const Home = ({
  enrolledCourses,
  completedCourses,
  statistics,
}: {
  enrolledCourses: HomeCourseFragment[];
  completedCourses: HomeCourseFragment[];
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
        <CoursesSection title={t('home.enrolledCoursesContinue')} courses={enrolledCourses} />
      )}

      {completedCourses.length > 0 && (
        <CoursesSection title={t('home.yourCompletedCourses')} courses={completedCourses} />
      )}
    </div>
  );
};

export default Home;
