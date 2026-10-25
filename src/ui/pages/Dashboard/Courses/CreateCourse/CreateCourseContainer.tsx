import { useQuery } from '@apollo/client/react';

import { CreateCoursePageDocument } from '@/generated/graphql';
import { CrudFormSkeleton, ErrorPlaceholder } from '@/ui/compositions';

import CreateCourse from './CreateCourse';

const CreateCourseContainer = () => {
  const { loading, error, data, refetch } = useQuery(CreateCoursePageDocument);

  if (loading) {
    return <CrudFormSkeleton variant="course" />;
  }

  if (error || !data) {
    return <ErrorPlaceholder onRetry={() => refetch()} />;
  }

  return <CreateCourse languages={data.languages} subjectsList={data.subjects} />;
};

export default CreateCourseContainer;
