import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';

import { useEditableCourseSectionQuery } from '@/generated/graphql';
import { Loader } from '@/ui/components';
import { ErrorPlaceholder, InfoState } from '@/ui/compositions';

import CourseSectionItem from './CourseSectionItem';

const CourseSectionItemContainer = () => {
  const {
    id: courseId,
    sectionId,
    itemId,
  } = useParams<{ id: string; sectionId: string; itemId: string }>();
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

  /* TODO: Replace hard-coded strings with translation keys */
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

  const currentCourseSectionItem = currentCourseSection.items.find(
    (item) => item.itemId === itemId,
  );

  /* TODO: Replace hard-coded strings with translation keys */
  if (!currentCourseSectionItem) {
    return (
      <InfoState
        btnLabel="Back to section"
        btnOnClick={() => navigate(`/dashboard/courses/update/${courseId}/sections/${sectionId}`)}
        subtitle="This section item does not exist"
        title="Item not found"
        icon={<CloseIcon />}
      />
    );
  }

  return (
    <CourseSectionItem
      sectionItem={currentCourseSectionItem}
      courseId={courseId}
      sectionId={sectionId}
      sectionDenomination={currentCourseSection.denomination}
    />
  );
};

export default CourseSectionItemContainer;