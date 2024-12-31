import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import TextField from '@mui/material/TextField';
import { compareAsc, compareDesc, format, parseISO } from 'date-fns';
import { ChangeEvent, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { TeacherCourseFragment } from '@/generated/graphql';
import { Button } from '@/ui/components';
import { isNumeric } from '@/utils/isNumeric';

const tableHeaderValues = [
  ['id'],
  ['denomination'],
  ['level'],
  ['is_published'],
  ['updated_at'],
  ['created_at'],
] as const;

const Courses = ({ courses }: { courses: Array<TeacherCourseFragment> }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState<keyof TeacherCourseFragment>('id');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  };

  const handleSort = (property: keyof TeacherCourseFragment) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const formatDate = (date: Date) => format(new Date(date), 'yyyy-MM-dd');

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(0); // Reset to first page when searching
  };

  const filteredAndSortedCourses = useMemo(() => {
    const filteredCourses = courses.filter((course) => {
      const searchableCourseFields = [
        'id',
        'denomination',
        'slug',
        'level',
        'created_at',
        'updated_at',
      ] as const;

      return searchableCourseFields.some((field) =>
        course[field].toString().toLowerCase().includes(searchTerm.toLowerCase()),
      );
    });

    return filteredCourses.sort((a, b) => {
      const valueA = a[orderBy];
      const valueB = b[orderBy];

      if (valueA === undefined || valueB === undefined) return 0;

      if (orderBy === 'created_at' || orderBy === 'updated_at') {
        return order === 'asc'
          ? compareAsc(parseISO(valueA), parseISO(valueB))
          : compareDesc(parseISO(valueA), parseISO(valueB));
      }

      if (typeof valueA === 'boolean' && typeof valueB === 'boolean') {
        return order === 'asc'
          ? valueA === valueB
            ? 0
            : valueA
              ? 1
              : -1
          : valueA === valueB
            ? 0
            : valueA
              ? -1
              : 1;
      }

      if (
        (typeof valueA === 'number' && typeof valueB === 'number') ||
        (isNumeric(valueA) && isNumeric(valueB))
      ) {
        return order === 'asc' ? valueA - valueB : valueB - valueA;
      }

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return order === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      }

      return 0;
    });
  }, [courses, order, orderBy, searchTerm]);

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', paddingBottom: '16px' }}>
        <div style={{ flex: 3 }}>
          <Button
            onClick={() => navigate('/dashboard/courses/create')}
            startIcon={<AddCircleOutlineIcon />}
          >
            {t('courses.createNewCourse')}
          </Button>
        </div>
        <div style={{ flex: 1 }}>
          <TextField
            label={t('courses.searchForCourse')}
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            fullWidth
          />
        </div>
      </div>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow sx={{ '& .MuiTableCell-head': { background: 'lightgray' } }}>
                {tableHeaderValues.map(([key]) => (
                  <TableCell key={key}>
                    <TableSortLabel
                      active={orderBy === key}
                      direction={orderBy === key ? order : 'asc'}
                      onClick={() => handleSort(key)}
                    >
                      {t(`courses.tableHeaders.${key}`)}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAndSortedCourses
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((course) => (
                  <TableRow
                    hover
                    key={course.id}
                    onClick={() => navigate(`/dashboard/courses/update/${course.id}`)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell>{course.id}</TableCell>
                    <TableCell>{course.denomination}</TableCell>
                    <TableCell>{course.level}</TableCell>
                    <TableCell>
                      {course.is_published ? t('courses.published') : t('courses.unpublished')}
                    </TableCell>
                    <TableCell>{formatDate(course.updated_at)}</TableCell>
                    <TableCell>{formatDate(course.created_at)}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={filteredAndSortedCourses.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default Courses;
