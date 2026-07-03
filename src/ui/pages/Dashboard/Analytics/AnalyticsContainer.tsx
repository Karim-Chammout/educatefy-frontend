import { useQuery } from '@apollo/client/react';

import { AnalyticsDocument } from '@/generated/graphql';
import { Loader } from '@/ui/components';
import { ErrorPlaceholder } from '@/ui/compositions';

import Analytics from './Analytics';

const AnalyticsContainer = () => {
  const { loading, error, data } = useQuery(AnalyticsDocument);

  if (loading) {
    return <Loader />;
  }

  if (error || !data || !data.teacherAnalytics) {
    return <ErrorPlaceholder />;
  }

  return <Analytics data={data.teacherAnalytics} />;
};

export default AnalyticsContainer;
