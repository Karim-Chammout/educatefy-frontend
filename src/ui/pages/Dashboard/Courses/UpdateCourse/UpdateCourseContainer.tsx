import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';

import { useEditableCourseQuery } from '@/generated/graphql';
import { Loader } from '@/ui/components';
import { ErrorPlaceholder, InfoState } from '@/ui/compositions';

import UpdateCourse from './UpdateCourse';

const UpdateCourseContainer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useEditableCourseQuery({
    variables: {
      id: id || '',
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

  return (
    <UpdateCourse
      course={data.editableCourse}
      languages={data.languages}
      subjectsList={data.subjects}
    />
  );
};

export default UpdateCourseContainer;
