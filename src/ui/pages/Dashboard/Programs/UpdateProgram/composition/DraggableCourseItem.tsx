import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import fallbackImage from '@/assets/educatefy_background.png';
import { ProgramCourseFragment } from '@/generated/graphql';
import useDND from '@/hooks/useDND';
import { Button, Typography } from '@/ui/components';

type DraggableCourseItemType = {
  course: ProgramCourseFragment;
  otherCourses: ProgramCourseFragment[];
  prerequisiteCourseId: string | null;
  onPrerequisiteChange: (courseId: string, prerequisiteCourseId: string | null) => void;
  onRemove: (courseId: string) => void;
};

const NO_PREREQUISITE_VALUE = '__none__';

const DraggableCourseItem = ({
  course,
  otherCourses,
  prerequisiteCourseId,
  onPrerequisiteChange,
  onRemove,
}: DraggableCourseItemType) => {
  const { t } = useTranslation();

  const { setNodeRef, isDragging, attributes, listeners } = useDND({
    itemId: course.id,
  });

  const handlePrerequisiteChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    onPrerequisiteChange(course.id, value === NO_PREREQUISITE_VALUE ? null : value);
  };

  return (
    <Box
      ref={setNodeRef}
      sx={{
        mb: 1,
        bgcolor: isDragging ? 'action.hover' : 'background.paper',
        border: 1,
        borderColor: isDragging ? 'primary.main' : 'divider',
        borderRadius: 1,
        opacity: isDragging ? 0.5 : 1,
        '&:hover': {
          bgcolor: 'action.hover',
          borderColor: 'primary.light',
        },
      }}
    >
      <ListItem sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        <IconButton sx={{ cursor: 'move', mr: 1 }} {...attributes} {...listeners}>
          <DragIndicatorIcon />
        </IconButton>

        <Box sx={{ display: 'flex', gap: '16px', alignItems: 'center', flex: 1 }}>
          <img
            src={course.image || fallbackImage}
            alt="Course img"
            style={{ height: '48px', width: '48px' }}
          />
          <ListItemText
            primary={course.denomination}
            secondary={
              <Box>
                <Typography variant="caption">
                  {`${t('content.tableHeaders.updated_at')} ${format(new Date(course.updated_at), 'd/M/yyyy')}`}
                </Typography>
                <Chip
                  label={t(`course.courseLevel.${course.level}`)}
                  variant="outlined"
                  size="small"
                  sx={{ fontSize: '12px' }}
                />
              </Box>
            }
          />
        </Box>

        {otherCourses.length > 0 && (
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>{t('program.prerequisite')}</InputLabel>
            <Select
              value={prerequisiteCourseId ?? NO_PREREQUISITE_VALUE}
              label={t('program.prerequisite')}
              onChange={handlePrerequisiteChange}
            >
              <MenuItem value={NO_PREREQUISITE_VALUE}>
                <Typography variant="body2" color="text.secondary">
                  {t('program.noPrerequisite')}
                </Typography>
              </MenuItem>
              {otherCourses.map((c) => (
                <MenuItem key={c.id} value={c.id}>
                  {c.denomination}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <IconButton color="error" size="small" onClick={() => onRemove(course.id)}>
            <DeleteIcon />
          </IconButton>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<OpenInNewIcon />}
            size="small"
            LinkComponent={Link}
            to={`/dashboard/courses/update/${course.id}`}
          >
            {t('common.open')}
          </Button>
        </Box>
      </ListItem>
    </Box>
  );
};

export default DraggableCourseItem;
