import { useParams, useSearchParams } from 'react-router';

import { ContentKind, InstructorDocument } from '@/generated/graphql';
import { usePaginatedQuery } from '@/hooks';
import { ErrorPlaceholder } from '@/ui/compositions';

import Instructor from './Instructor';
import InstructorSkeleton from './InstructorSkeleton';
import { ContentTypeFilter } from './types';

const INSTRUCTOR_CONTENT_PAGE_SIZE = 8;

const parseContentType = (value: string | null): ContentTypeFilter => {
  if (value === 'course' || value === 'program') {
    return value;
  }

  return 'all';
};

const toContentKind = (filter: ContentTypeFilter): ContentKind | null => {
  switch (filter) {
    case 'course':
      return ContentKind.Course;
    case 'program':
      return ContentKind.Program;
    default:
      return null;
  }
};

const InstructorContainer = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const contentType = parseContentType(searchParams.get('type'));

  const { loading, error, data, currentPage, pageCount, onPageChange } = usePaginatedQuery(
    InstructorDocument,
    {
      pageSize: INSTRUCTOR_CONTENT_PAGE_SIZE,
      selectTotalCount: (d) => d.instructor?.content.totalCount ?? 0,
      variables: { id: id || '', type: toContentKind(contentType) },
    },
  );

  // A new filter is a new result set, so it must not keep the old page's offset.
  const onContentTypeChange = (next: ContentTypeFilter) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      params.delete('page');

      if (next === 'all') {
        params.delete('type');
      } else {
        params.set('type', next);
      }

      return params;
    });
  };

  if (loading) {
    return <InstructorSkeleton />;
  }

  if (error || !data || !data.instructor) {
    return <ErrorPlaceholder />;
  }

  return (
    <Instructor
      instructor={data.instructor}
      contentItems={data.instructor.content.items}
      contentTotalCount={data.instructor.content.totalCount}
      contentType={contentType}
      onContentTypeChange={onContentTypeChange}
      currentPage={currentPage}
      pageCount={pageCount}
      onPageChange={onPageChange}
    />
  );
};

export default InstructorContainer;
