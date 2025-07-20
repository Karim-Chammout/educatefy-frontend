import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';

import { CourseFragment } from '@/generated/graphql';
import { ToasterContext } from '@/ui/context';
import { MUST_ENROLL_TO_COURSE_FIRST } from '@/utils/constants';

import { CourseHeader, CourseInstructor, CourseOverview, ReviewsList } from './composition';

const Course = ({ courseInfo }: { courseInfo: CourseFragment }) => {
  const location = useLocation();
  const { t } = useTranslation();
  const { setToasterVisibility } = useContext(ToasterContext);

  useEffect(() => {
    if (location.state?.action === MUST_ENROLL_TO_COURSE_FIRST) {
      setToasterVisibility({
        newDuration: 5000,
        newType: 'error',
        newText: t('course.mustEnrollFirst'),
      });
    }
  }, [location.state?.action, setToasterVisibility, t]);

  return (
    <div style={{ marginTop: '16px' }}>
      <CourseHeader courseInfo={courseInfo} />

      <CourseOverview courseInfo={courseInfo} />

      <CourseInstructor courseInfo={courseInfo} />

      <ReviewsList courseInfo={courseInfo} />
    </div>
  );
};

export default Course;
