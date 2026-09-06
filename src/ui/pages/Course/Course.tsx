import { useContext, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';

import { CourseFragment } from '@/generated/graphql';
import { ToasterContext } from '@/ui/context';
import { hasSectionContent } from '@/ui/pages/CourseSection/utils/sectionItems';
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
  }, [location.state?.action]);

  // Empty sections (no quizzes, no lessons with components) are not rendered at all.
  const sections = useMemo(
    () => courseInfo.sections.filter(hasSectionContent),
    [courseInfo.sections],
  );

  const course = useMemo(() => ({ ...courseInfo, sections }), [courseInfo, sections]);

  return (
    <div style={{ marginTop: '16px' }}>
      <CourseHeader courseInfo={course} />

      <CourseOverview courseInfo={course} />

      <CourseInstructor courseInfo={course} />

      <ReviewsList courseInfo={course} />
    </div>
  );
};

export default Course;
