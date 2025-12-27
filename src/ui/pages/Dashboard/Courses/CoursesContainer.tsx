import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { useTeacherCoursesQuery } from '@/generated/graphql';
import { Loader } from '@/ui/components';
import { ErrorPlaceholder, InfoState } from '@/ui/compositions';

import Courses from './Courses';

const CoursesContainer = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { loading, error, data } = useTeacherCoursesQuery();

  if (loading) {
    return <Loader />;
  }

  if (error || !data) {
    return <ErrorPlaceholder />;
  }

  if (data.teacherCourses.length === 0) {
    return (
      <InfoState
        btnLabel={t('courses.createNewCourse')}
        btnOnClick={() => navigate('/dashboard/courses/create')}
        subtitle={t('courses.noCoursesSubtitle')}
        title={t('courses.noCoursesTitle')}
        icon={<AddCircleOutlineIcon />}
      />
    );
  }

  return <Courses courses={data.teacherCourses} />;
};

export default CoursesContainer;
