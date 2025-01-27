import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { useEditableCourseSectionQuery } from '@/generated/graphql';
import { Loader } from '@/ui/components';
import { ErrorPlaceholder, InfoState } from '@/ui/compositions';
import CourseSection from './CourseSection';

const CourseSectionContainer = () => {
  const { id: courseId, sectionId } = useParams<{ id: string; sectionId: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { loading, error, data } = useEditableCourseSectionQuery({
    variables: {
      id: courseId || '',
    },
  });

  if (loading) {
    return <Loader />;
  }

  if (error || !data) {
    return <ErrorPlaceholder />;
  }

  if (!data.editableCourse) {
    return (
      <InfoState
        btnLabel={t('common.backToCourses')}
        btnOnClick={() => navigate('/dashboard/courses')}
        subtitle={t('course.notFoundSubtitle')}
        title={t('course.notFoundTitle')}
        icon={<CloseIcon />}
      />
    );
  }

  const currentCourseSection = data.editableCourse.sections.find(
    (section) => section.id === sectionId,
  );

  /* TODO: Add translation keys */
  if (!currentCourseSection) {
    return (
      <InfoState
        btnLabel="Back to sections"
        btnOnClick={() => navigate(`/dashboard/courses/update/${courseId}/sections`)}
        subtitle="This course section does not exist"
        title="Section not found"
        icon={<CloseIcon />}
      />
    );
  }

  return <CourseSection courseId={courseId as string} section={currentCourseSection} />;
};

export default CourseSectionContainer;
