import { TopContentDocument } from '@/generated/graphql';
import { usePaginatedQuery } from '@/hooks';
import { ErrorPlaceholder } from '@/ui/compositions';

import TopContent from './TopContent';
import TopContentSkeleton from './TopContentSkeleton';

const TOP_CONTENT_PAGE_SIZE = 8;

const TopContentContainer = () => {
  const { loading, error, data, currentPage, pageCount, onPageChange } = usePaginatedQuery(
    TopContentDocument,
    { pageSize: TOP_CONTENT_PAGE_SIZE, selectTotalCount: (d) => d.topContent.totalCount },
  );

  if (loading) {
    return <TopContentSkeleton />;
  }

  if (error || !data) {
    return <ErrorPlaceholder />;
  }

  return (
    <TopContent
      items={data.topContent.items}
      currentPage={currentPage}
      pageCount={pageCount}
      onPageChange={onPageChange}
    />
  );
};

export default TopContentContainer;
