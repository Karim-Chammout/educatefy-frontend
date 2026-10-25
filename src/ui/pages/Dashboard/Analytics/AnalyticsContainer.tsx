import { useQuery } from '@apollo/client/react';

import { AnalyticsDocument } from '@/generated/graphql';
import { ErrorPlaceholder } from '@/ui/compositions';

import Analytics from './Analytics';
import AnalyticsSkeleton from './AnalyticsSkeleton';

const AnalyticsContainer = () => {
  const { loading, error, data, refetch } = useQuery(AnalyticsDocument);

  if (loading) {
    return <AnalyticsSkeleton />;
  }

  if (error || !data || !data.teacherAnalytics) {
    return <ErrorPlaceholder onRetry={() => refetch()} />;
  }

  return <Analytics data={data.teacherAnalytics} />;
};

export default AnalyticsContainer;
