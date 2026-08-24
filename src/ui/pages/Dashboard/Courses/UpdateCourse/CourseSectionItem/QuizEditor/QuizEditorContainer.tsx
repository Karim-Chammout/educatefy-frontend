import { useQuery } from '@apollo/client/react';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { EditableCourseSectionDocument } from '@/generated/graphql';
import { ErrorPlaceholder, InfoState } from '@/ui/compositions';

import QuizEditor from './QuizEditor';
import QuizEditorSkeleton from './QuizEditorSkeleton';

const QuizEditorContainer = ({ mode }: { mode: 'create' | 'edit' }) => {
  const {
    id: courseId,
    sectionId,
    itemId,
  } = useParams<{
    id: string;
    sectionId: string;
    itemId?: string;
  }>();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(EditableCourseSectionDocument, {
    variables: { id: courseId || '' },
    skip: mode === 'create',
  });

  if (mode === 'create') {
    if (!courseId || !sectionId) {
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

    return (
      <QuizEditor
        mode="create"
        courseId={courseId}
        sectionId={sectionId}
        sectionDenomination=""
        quizName=""
      />
    );
  }

  if (loading) {
    return <QuizEditorSkeleton />;
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

  const currentSection = data.editableCourse.sections.find((section) => section.id === sectionId);

  if (!currentSection) {
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

  const quizItem = currentSection.items.find(
    (item): item is Extract<typeof item, { __typename: 'Quiz' }> =>
      item.__typename === 'Quiz' && item.itemId === itemId,
  );

  if (!quizItem) {
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
    <QuizEditor
      mode="edit"
      courseId={courseId as string}
      sectionId={sectionId as string}
      sectionDenomination={currentSection.denomination}
      quizName={quizItem.denomination}
      quizItemId={quizItem.itemId}
      quizItem={quizItem as any}
    />
  );
};

export default QuizEditorContainer;
