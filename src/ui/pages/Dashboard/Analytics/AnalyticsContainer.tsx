import { useQuery } from '@apollo/client/react';

import { AnalyticsDocument } from '@/generated/graphql';
import { ErrorPlaceholder } from '@/ui/compositions';

import Analytics from './Analytics';
import AnalyticsSkeleton from './AnalyticsSkeleton';

const AnalyticsContainer = () => {
  const { loading, error, data } = useQuery(AnalyticsDocument);

  if (loading) {
    return <AnalyticsSkeleton />;
  }

  if (error || !data || !data.teacherAnalytics) {
    return <ErrorPlaceholder />;
  }

  return <Analytics data={data.teacherAnalytics} />;
};

export default AnalyticsContainer;
