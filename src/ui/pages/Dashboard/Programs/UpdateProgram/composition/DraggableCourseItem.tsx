import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import fallbackImage from '@/assets/educatefy_background.png';
import useDND from '@/hooks/useDND';
import { Button, Typography } from '@/ui/components';
import { ProgramCourseFragment } from '@/generated/graphql';

type DraggableCourseItemType = {
  course: ProgramCourseFragment;
  index: number;
  onRemove: (courseId: string) => void;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
  onDragEnd: () => Promise<void>;
};

const COURSE_ITEM_TYPE = 'COURSE_ITEM';

const DraggableCourseItem = ({
  course,
  index,
  onRemove,
  moveItem,
  onDragEnd,
}: DraggableCourseItemType) => {
  const { t } = useTranslation();

  const { ref, isDragging, handlerId } = useDND({
    index,
    itemId: course.id,
    itemType: COURSE_ITEM_TYPE,
    moveItem,
    onDragEnd,
  });

  return (
    <Box
      ref={ref}
      data-handler-id={handlerId}
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
        <IconButton sx={{ cursor: 'move', mr: 1 }}>
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
            slotProps={{
              primary: {
                fontWeight: 500,
              },
            }}
          />
        </Box>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
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
        </div>
      </ListItem>
    </Box>
  );
};

export default DraggableCourseItem;
