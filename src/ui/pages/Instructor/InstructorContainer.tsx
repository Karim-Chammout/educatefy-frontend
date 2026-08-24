import { useQuery } from '@apollo/client/react';
import { useParams } from 'react-router';

import { InstructorDocument } from '@/generated/graphql';
import { ErrorPlaceholder } from '@/ui/compositions';

import Instructor from './Instructor';
import InstructorSkeleton from './InstructorSkeleton';

const InstructorContainer = () => {
  const { id } = useParams();

  const { loading, error, data } = useQuery(InstructorDocument, {
    variables: {
      id: id || '',
    },
  });

  if (loading) {
    return <InstructorSkeleton />;
  }

  if (error || !data || !data.instructor) {
    return <ErrorPlaceholder />;
  }

  return <Instructor instructor={data.instructor} />;
};

export default InstructorContainer;
