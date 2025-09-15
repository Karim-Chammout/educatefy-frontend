import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { useEditableCourseSectionQuery } from '@/generated/graphql';
import { Loader } from '@/ui/components';
import { ErrorPlaceholder, InfoState } from '@/ui/compositions';

import { ComponentProvider } from './composition';
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

  if (!currentCourseSection) {
    return (
      <InfoState
        btnLabel={t('courseSection.backToSectionsBtn')}
        btnOnClick={() => navigate(`/dashboard/courses/update/${courseId}/sections`)}
        subtitle={t('courseSection.noSectionsSubtitle')}
        title={t('courseSection.sectionNotFound')}
        icon={<CloseIcon />}
      />
    );
  }

  const currentCourseSectionItem = currentCourseSection.items.find(
    (item) => item.itemId === itemId,
  );

  if (!currentCourseSectionItem) {
    return (
      <InfoState
        btnLabel={t('sectionItem.backToSectionBtn')}
        btnOnClick={() => navigate(`/dashboard/courses/update/${courseId}/sections/${sectionId}`)}
        subtitle={t('sectionItem.noSectionItemSubtitle')}
        title={t('sectionItem.itemNotFound')}
        icon={<CloseIcon />}
      />
    );
  }

  return (
    <ComponentProvider
      initialComponents={currentCourseSectionItem.components}
      courseId={courseId}
      sectionId={sectionId}
      itemId={itemId}
      parentId={currentCourseSectionItem.id}
    >
      <CourseSectionItem
        sectionItem={currentCourseSectionItem}
        courseId={courseId}
        sectionId={sectionId}
        sectionDenomination={currentCourseSection.denomination}
      />
    </ComponentProvider>
  );
};

export default CourseSectionItemContainer;
