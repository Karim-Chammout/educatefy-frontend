import { Loader } from '@/ui/components';

import { useLanguageQuery } from '@/generated/graphql';
import CreateCourse from './CreateCourse';
import { ErrorPlaceholder } from '@/ui/compositions';

const CreateCourseContainer = () => {
  const { loading, error, data } = useLanguageQuery();

  if (loading) {
    return <Loader />;
  }

  if (error || !data) {
    return <ErrorPlaceholder />;
  }

  return <CreateCourse languages={data.languages} />;
};

export default CreateCourseContainer;
