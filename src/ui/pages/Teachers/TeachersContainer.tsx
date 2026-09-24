import { TeachersDocument } from '@/generated/graphql';
import { usePaginatedQuery } from '@/hooks';
import { ErrorPlaceholder } from '@/ui/compositions';

import { TeachersSkeleton } from './composition';
import Teachers from './Teachers';

const TEACHERS_PAGE_SIZE = 8;

const TeachersContainer = () => {
  const { loading, error, data, currentPage, pageCount, onPageChange } = usePaginatedQuery(
    TeachersDocument,
    { pageSize: TEACHERS_PAGE_SIZE, selectTotalCount: (d) => d.teachers.totalCount },
  );

  if (loading) {
    return <TeachersSkeleton />;
  }

  if (error || !data) {
    return <ErrorPlaceholder />;
  }

  return (
    <Teachers
      teachers={data.teachers.items}
      currentPage={currentPage}
      pageCount={pageCount}
      onPageChange={onPageChange}
    />
  );
};

export default TeachersContainer;
