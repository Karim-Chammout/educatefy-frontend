import { useCreateCoursePageQuery } from '@/generated/graphql';
import { Loader } from '@/ui/components';
import { ErrorPlaceholder } from '@/ui/compositions';

import CreateCourse from './CreateCourse';

const CreateCourseContainer = () => {
  const { loading, error, data } = useCreateCoursePageQuery();

  if (loading) {
    return <Loader />;
  }

  if (error || !data) {
    return <ErrorPlaceholder />;
  }

  return <CreateCourse languages={data.languages} subjectsList={data.subjects} />;
};

export default CreateCourseContainer;
