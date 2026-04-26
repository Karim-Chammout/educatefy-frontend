import { useQuery } from '@apollo/client/react';

import { CreateProgramPageDocument } from '@/generated/graphql';
import { Loader } from '@/ui/components';
import { ErrorPlaceholder } from '@/ui/compositions';

import CreateProgram from './CreateProgram';

const CreateProgramContainer = () => {
  const { loading, error, data } = useQuery(CreateProgramPageDocument);

  if (loading) {
    return <Loader />;
  }

  if (error || !data) {
    return <ErrorPlaceholder />;
  }

  return <CreateProgram subjectsList={data.subjects} />;
};

export default CreateProgramContainer;
