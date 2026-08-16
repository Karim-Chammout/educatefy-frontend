import { useQuery } from '@apollo/client/react';
import CloseIcon from '@mui/icons-material/Close';
import ContentPasteOffIcon from '@mui/icons-material/ContentPasteOff';
import { useTranslation } from 'react-i18next';
import { Navigate, useNavigate, useParams } from 'react-router';

import { CourseDocument, CourseStatus } from '@/generated/graphql';
import { Loader } from '@/ui/components';
import { ErrorPlaceholder, InfoState } from '@/ui/compositions';
import { MUST_ENROLL_TO_COURSE_FIRST } from '@/utils/constants';

import Section from './Section';
import { getItemComponents } from './utils/sectionItems';

const CourseSectionContainer = () => {
  const { t } = useTranslation();
  const { slug, sectionId, itemId } = useParams();
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(CourseDocument, {
    variables: {
      slug: slug || '',
    },
  });

  if (loading) {
    return <Loader />;
  }

  if (error || !data) {
    return <ErrorPlaceholder />;
  }

  if (!data.course) {
    return (
      <InfoState
        title={t('course.notFoundTitle')}
        subtitle={t('course.notFoundSubtitle')}
        btnLabel={t('common.exploreBtnLabel')}
        btnOnClick={() => navigate('/explore')}
        icon={<CloseIcon />}
      />
    );
  }

  if (
    data.course.status === CourseStatus.Available ||
    data.course.status === CourseStatus.Unenrolled
  ) {
    return <Navigate to={`/course/${slug}`} state={{ action: MUST_ENROLL_TO_COURSE_FIRST }} />;
  }

  const section = data.course.sections.find((s) => s.id === sectionId);

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

  if (
    !section.items ||
    section.items.length === 0 ||
    section.items.every((item) => item.__typename === 'Lesson' && item.components.length === 0)
  ) {
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

    if (firstContentItem) {
      return (
        <Navigate
          to={`/course/${slug}/section/${section.id}/item/${firstContentItem.id}`}
          replace
        />
      );
    }
  }

  const hasValidItem = section.items.some((item) => item.id === itemId);

  if (!hasValidItem) {
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

  return <Section section={section} />;
};

export default CourseSectionContainer;
