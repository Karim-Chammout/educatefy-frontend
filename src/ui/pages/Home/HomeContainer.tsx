import { useQuery } from '@apollo/client/react';

import { HomeDocument } from '@/generated/graphql';
import { ErrorPlaceholder } from '@/ui/compositions';

import Home from './Home';
import { HomeSkeleton } from './composition';

const HomeContainer = () => {
  // Not trusted from cache: follow/enrollment mutations can happen while Home is
  // unmounted, where Apollo's active-only refetch cannot reach it.
  const { loading, error, data } = useQuery(HomeDocument, { fetchPolicy: 'network-only' });

  if (loading) {
    return <HomeSkeleton />;
  }

  if (error || !data || !data.me) {
    return <ErrorPlaceholder />;
  }

  return (
    <Home
      enrolledCourses={data.enrolledCourses}
      completedCourses={data.completedCourses}
      teacherFeed={data.followingFeedByTeachers}
      statistics={data.me.statistics}
    />
  );
};

export default HomeContainer;
