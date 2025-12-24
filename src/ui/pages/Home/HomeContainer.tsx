import { useHomeQuery } from '@/generated/graphql';
import { Loader } from '@/ui/components';
import { ErrorPlaceholder } from '@/ui/compositions';

import Home from './Home';

const HomeContainer = () => {
  const { loading, error, data } = useHomeQuery();

  if (loading) {
    return <Loader />;
  }

  if (error || !data || !data.me) {
    return <ErrorPlaceholder />;
  }

  return (
    <Home
      enrolledCourses={data.enrolledCourses}
      completedCourses={data.completedCourses}
      statistics={data.me.statistics}
    />
  );
};

export default HomeContainer;
