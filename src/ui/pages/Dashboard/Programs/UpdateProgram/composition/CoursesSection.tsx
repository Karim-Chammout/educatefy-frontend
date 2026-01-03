import AddIcon from '@mui/icons-material/Add';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { format } from 'date-fns';
import { useCallback, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import withScrolling from 'react-dnd-scrolling';
import { TouchBackend } from 'react-dnd-touch-backend';
import { useTranslation } from 'react-i18next';

import fallbackImage from '@/assets/educatefy_background.png';
import { ProgramCourseFragment, useUpdateProgramCourseRanksMutation } from '@/generated/graphql';
import { Button, Typography } from '@/ui/components';

import DraggableCourseItem from './DraggableCourseItem';

type CoursesSectionType = {
  programId: string;
  availableCourses: ProgramCourseFragment[];
  selectedCourses: ProgramCourseFragment[];
  onCoursesChange: (courses: ProgramCourseFragment[]) => void;
};

const ScrollingComponent = withScrolling('div');

const CoursesSection = ({
  programId,
  availableCourses,
  selectedCourses,
  onCoursesChange,
}: CoursesSectionType) => {
  const { t } = useTranslation();

  const currentCoursesRanks = selectedCourses.map((sc, i) => ({
    id: sc.id,
    rank: i + 1,
  }));

  const [selectedCourse, setSelectedCourse] = useState<ProgramCourseFragment | null>(null);
  const [coursesRanks, setCoursesRanks] = useState(currentCoursesRanks);

  const [updateProgramCourseRanks] = useUpdateProgramCourseRanksMutation();

  const handleAddCourse = () => {
    if (selectedCourse && !selectedCourses.find((c) => c.id === selectedCourse.id)) {
      onCoursesChange([...selectedCourses, selectedCourse]);
      setSelectedCourse(null);
    }
  };

  const handleRemoveCourse = (courseId: string) => {
    onCoursesChange(selectedCourses.filter((c) => c.id !== courseId));
  };

  const moveItem = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const updatedCourses = [...selectedCourses];
      const [draggedItem] = updatedCourses.splice(dragIndex, 1);
      updatedCourses.splice(hoverIndex, 0, draggedItem);

      // Update ranks after reordering
      setCoursesRanks(
        updatedCourses.map((updatedCourse, index) => ({
          id: updatedCourse.id,
          rank: index + 1,
        })),
      );

      onCoursesChange(updatedCourses);
    },
    [selectedCourses, onCoursesChange],
  );

  const handleDragEnd = useCallback(async () => {
    const updates = coursesRanks.map((course) => ({
      id: course.id,
      rank: course.rank,
    }));

    await updateProgramCourseRanks({
      variables: {
        programId,
        courseRanks: updates,
      },
    });
  }, [coursesRanks, programId, updateProgramCourseRanks]);

  const unselectedCourses = availableCourses.filter(
    (course) => !selectedCourses.find((sc) => sc.id === course.id),
  );

  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const backend = isTouchDevice ? TouchBackend : HTML5Backend;

  return (
    <Paper elevation={0} variant="outlined" sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {t('program.courses')}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {t('program.coursesDesc')}
      </Typography>

      {/* Add Course Section */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Autocomplete
          fullWidth
          options={unselectedCourses}
          value={selectedCourse}
          onChange={(_, newValue) => setSelectedCourse(newValue)}
          getOptionLabel={(option) => option.denomination}
          renderOption={(props, option) => (
            <li {...props}>
              <Box sx={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <img
                  src={option.image || fallbackImage}
                  alt="Course img"
                  style={{ height: '48px', width: '48px' }}
                />
                <div>
                  <Typography variant="body1">{option.denomination}</Typography>
                  <Typography variant="caption">
                    {`${t('content.tableHeaders.updated_at')} ${format(new Date(option.updated_at), 'd/M/yyyy')}`}
                  </Typography>
                  <Chip
                    label={t(`course.courseLevel.${option.level}`)}
                    size="small"
                    variant="outlined"
                    sx={{ fontSize: '10px' }}
                  />
                </div>
              </Box>
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label={t('program.selectCourse')}
              placeholder={t('program.searchCourse')}
            />
          )}
          noOptionsText={t('program.noCourses')}
        />
        <Button
          onClick={handleAddCourse}
          disabled={!selectedCourse}
          startIcon={<AddIcon />}
          sx={{ minWidth: 120 }}
        >
          {t('common.add')}
        </Button>
      </Box>

      {/* Selected Courses List */}
      {selectedCourses.length > 0 ? (
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              {t('program.selectedCourses')} ({selectedCourses.length})
            </Typography>
            <Chip
              label={t('common.dragToReorder')}
              size="small"
              variant="outlined"
              sx={{ fontSize: '10px' }}
            />
          </Box>

          <DndProvider backend={backend}>
            <ScrollingComponent>
              <List sx={{ p: 0 }}>
                {selectedCourses.map((course, index) => (
                  <DraggableCourseItem
                    key={course.id}
                    course={course}
                    index={index}
                    onRemove={handleRemoveCourse}
                    moveItem={moveItem}
                    onDragEnd={handleDragEnd}
                  />
                ))}
              </List>
            </ScrollingComponent>
          </DndProvider>
        </Box>
      ) : (
        <Box
          sx={{
            p: 4,
            textAlign: 'center',
            border: 2,
            borderStyle: 'dashed',
            borderColor: 'divider',
            borderRadius: 1,
            bgcolor: 'action.hover',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {t('program.noCoursesSelected')}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default CoursesSection;
