import { useParams } from 'react-router';

import { useInstructorQuery } from '@/generated/graphql';
import { Loader } from '@/ui/components';
import { ErrorPlaceholder } from '@/ui/compositions';

import Instructor from './Instructor';

const InstructorContainer = () => {
  const { id } = useParams();

  const { loading, error, data } = useInstructorQuery({
    variables: {
      id: id || '',
    },
  });

  if (loading) {
    return <Loader />;
  }

  if (error || !data || !data.instructor) {
    return <ErrorPlaceholder />;
  }

  return <Instructor instructor={data.instructor} />;
};

export default InstructorContainer;
