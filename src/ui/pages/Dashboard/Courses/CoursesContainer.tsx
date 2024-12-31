import { useTeacherCoursesQuery } from '@/generated/graphql';
import { Loader } from '@/ui/components';
import { ErrorPlaceholder } from '@/ui/compositions';

import Courses from './Courses';

const CoursesContainer = () => {
  const { loading, error, data } = useTeacherCoursesQuery();

  if (loading) {
    return <Loader />;
  }

  if (error || !data) {
    return <ErrorPlaceholder />;
  }

  return <Courses courses={data.teacherCourses} />;
};

export default CoursesContainer;
