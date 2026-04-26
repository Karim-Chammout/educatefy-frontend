import { useQuery } from '@apollo/client/react';
import { useParams } from 'react-router';

import { SubjectDocument } from '@/generated/graphql';
import { Loader } from '@/ui/components';
import { ErrorPlaceholder } from '@/ui/compositions';

import Subject from './Subject';

const SubjectContainer = () => {
  const { id } = useParams();

  const { loading, error, data } = useQuery(SubjectDocument, {
    variables: {
      id: id || '',
    },
  });

  if (loading) {
    return <Loader />;
  }

  if (error || !data || !data.subject) {
    return <ErrorPlaceholder />;
  }

  return <Subject subject={data.subject} />;
};

export default SubjectContainer;
