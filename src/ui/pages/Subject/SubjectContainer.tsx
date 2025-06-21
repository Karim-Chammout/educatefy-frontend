import { useParams } from 'react-router';

import { useSubjectQuery } from '@/generated/graphql';
import { Loader } from '@/ui/components';
import { ErrorPlaceholder } from '@/ui/compositions';

import Subject from './Subject';

const SubjectContainer = () => {
  const { id } = useParams();

  const { loading, error, data } = useSubjectQuery({
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

  return (
    <div>
      <Subject subject={data.subject} />
    </div>
  );
};

export default SubjectContainer;
