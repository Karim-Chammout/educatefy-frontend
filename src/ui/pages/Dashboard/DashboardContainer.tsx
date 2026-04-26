import { useQuery } from '@apollo/client/react';

import { DashboardDocument, MeDocument } from '@/generated/graphql';
import { Loader } from '@/ui/components';
import { ErrorPlaceholder } from '@/ui/compositions';

import Dashboard from './Dashboard';

const DashboardContainer = () => {
  const { data: userInfo, loading: userLoading } = useQuery(MeDocument, {
    fetchPolicy: 'cache-first',
  });

  const { loading, error, data } = useQuery(DashboardDocument, {
    variables: {
      instructorId: userInfo?.me.id || '',
    },
    skip: !userInfo?.me.id,
  });

  if (userLoading || loading) {
    return <Loader />;
  }

  if (!userInfo?.me.id || error || !data || !data.instructor) {
    return <ErrorPlaceholder />;
  }

  return <Dashboard instructor={data.instructor} />;
};

export default DashboardContainer;
