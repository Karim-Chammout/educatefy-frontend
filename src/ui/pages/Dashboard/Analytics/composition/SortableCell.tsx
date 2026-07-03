import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';

import { TeacherAnalyticsDataFragment } from '@/generated/graphql';

type CourseRow = TeacherAnalyticsDataFragment['courseStats'][number];
export type SortKey = keyof Pick<
  CourseRow,
  | 'denomination'
  | 'isPublished'
  | 'enrolledCount'
  | 'completedCount'
  | 'completionRate'
  | 'averageRating'
  | 'ratingsCount'
>;

const SortableCell = ({
  label,
  field,
  sortKey,
  sortDir,
  onSort,
}: {
  label: string;
  field: SortKey;
  sortKey: SortKey;
  sortDir: 'asc' | 'desc';
  onSort: (key: SortKey) => void;
}) => (
  <TableCell sortDirection={sortKey === field ? sortDir : false}>
    <TableSortLabel
      active={sortKey === field}
      direction={sortKey === field ? sortDir : 'desc'}
      onClick={() => onSort(field)}
    >
      {label}
    </TableSortLabel>
  </TableCell>
);

export default SortableCell;
