import { useQuery } from '@apollo/client/react';
import { useState } from 'react';
import { useParams } from 'react-router';

import { CourseDetailAnalyticsDocument } from '@/generated/graphql';
import { Loader } from '@/ui/components';
import { ErrorPlaceholder } from '@/ui/compositions';

import CourseDetailAnalytics from './CourseDetailAnalytics';

const PAGE_SIZE = 20;

const CourseDetailAnalyticsContainer = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [offset, setOffset] = useState(0);

  const { loading, error, data, fetchMore } = useQuery(CourseDetailAnalyticsDocument, {
    variables: {
      courseId: courseId ?? '',
      limit: PAGE_SIZE,
      offset: 0,
    },
    skip: !courseId,
  });

  if (loading) {
    return <Loader />;
  }

  if (error || !data?.courseDetailAnalytics) {
    return <ErrorPlaceholder />;
  }

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    const newOffset = (page - 1) * PAGE_SIZE;
    setOffset(newOffset);
    fetchMore({
      variables: {
        offset: newOffset,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        return {
          __typename: 'Query',
          ...(fetchMoreResult.courseDetailAnalytics && {
            courseDetailAnalytics: {
              ...fetchMoreResult.courseDetailAnalytics,
              // Preserve non-paginated fields from the original query
              enrolledStudents: fetchMoreResult.courseDetailAnalytics?.enrolledStudents,
            },
          }),
        };
      },
    });
  };

  return (
    <CourseDetailAnalytics
      data={data.courseDetailAnalytics}
      pageSize={PAGE_SIZE}
      currentOffset={offset}
      onPageChange={handlePageChange}
    />
  );
};

export default CourseDetailAnalyticsContainer;
