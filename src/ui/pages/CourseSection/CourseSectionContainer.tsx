import { useQuery } from '@apollo/client/react';
import CloseIcon from '@mui/icons-material/Close';
import ContentPasteOffIcon from '@mui/icons-material/ContentPasteOff';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, useNavigate, useParams } from 'react-router';

import { CourseDocument, CourseStatus, HomeDocument } from '@/generated/graphql';
import { ErrorPlaceholder, InfoState } from '@/ui/compositions';
import { MUST_ENROLL_TO_COURSE_FIRST } from '@/utils/constants';

import { CompletedCourseModal } from '../Course/composition';
import Section from './Section';
import { SectionSkeleton } from './composition';
import { getItemComponents } from './utils/sectionItems';

const CourseSectionContainer = () => {
  const { t } = useTranslation();
  const { slug, sectionId, itemId } = useParams();
  const navigate = useNavigate();
  const [showCompletedModal, setShowCompletedModal] = useState(false);

  const { loading, error, data, refetch } = useQuery(CourseDocument, {
    variables: {
      slug: slug || '',
    },
  });
  const { refetch: refetchHome } = useQuery(HomeDocument, { skip: true });

  const handleCourseCompleted = useCallback(() => {
    setShowCompletedModal(true);
    refetch().catch(() => {});
    refetchHome().catch(() => {});
  }, [refetch, refetchHome]);

  if (loading) {
    return <SectionSkeleton />;
  }

  if (error || !data || !data.course) {
    return <ErrorPlaceholder />;
  }

  const { course } = data;

  if (course.status === CourseStatus.Available || course.status === CourseStatus.Unenrolled) {
    return <Navigate to={`/course/${slug}`} state={{ action: MUST_ENROLL_TO_COURSE_FIRST }} />;
  }

  const section = course.sections.find((s) => s.id === sectionId);

  if (!section) {
    return (
      <InfoState
        btnLabel={t('courseSection.backToCourse')}
        btnOnClick={() => navigate(`/course/${slug}`)}
        subtitle={t('courseSection.noSectionsSubtitle')}
        title={t('courseSection.sectionNotFound')}
        icon={<CloseIcon />}
      />
    );
  }

  const hasNoItems =
    !section.items ||
    section.items.length === 0 ||
    section.items.every((item) => item.__typename === 'Lesson' && item.components.length === 0);

  if (hasNoItems) {
    return (
      <InfoState
        btnLabel={t('courseSection.backToCourse')}
        btnOnClick={() => navigate(`/course/${slug}`)}
        subtitle={t('courseSection.noItemsSubtitle')}
        title={t('courseSection.noItems')}
        icon={<ContentPasteOffIcon />}
      />
    );
  }

  if (!itemId) {
    const firstContentItem = section.items.find((item) => getItemComponents(item).length > 0);

    if (!firstContentItem) {
      return null;
    }

    return (
      <Navigate to={`/course/${slug}/section/${section.id}/item/${firstContentItem.id}`} replace />
    );
  }

  if (!section.items.some((item) => item.id === itemId)) {
    return (
      <InfoState
        btnLabel={t('courseSection.backToCourse')}
        btnOnClick={() => navigate(`/course/${slug}`)}
        subtitle={t('sectionItem.noSectionItemSubtitle')}
        title={t('sectionItem.itemNotFound')}
        icon={<CloseIcon />}
      />
    );
  }

  return (
    <>
      <Section
        section={section}
        sections={course.sections}
        courseId={course.id}
        onCourseCompleted={handleCourseCompleted}
        refetchCourse={refetch}
      />
      <CompletedCourseModal
        open={showCompletedModal}
        courseId={course.id}
        onClose={() => setShowCompletedModal(false)}
      />
    </>
  );
};

export default CourseSectionContainer;
