import { useDashboardQuery, useMeQuery } from '@/generated/graphql';
import { Loader } from '@/ui/components';
import { ErrorPlaceholder } from '@/ui/compositions';

import Dashboard from './Dashboard';

const DashboardContainer = () => {
  const { data: userInfo, loading: userLoading } = useMeQuery({
    fetchPolicy: 'cache-first',
  });

  const { loading, error, data } = useDashboardQuery({
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
