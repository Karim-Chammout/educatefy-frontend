import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import EditIcon from '@mui/icons-material/Edit';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { EditableCourseSectionFragment } from '@/generated/graphql';
import { useDND } from '@/hooks';
import { Button } from '@/ui/components';

type CourseSectionType = EditableCourseSectionFragment['sections'][0];

type DraggableSectionItemType = {
  section: CourseSectionType;
  index: number;
  moveSection: (dragIndex: number, hoverIndex: number) => void;
  handleDelete: (id: string) => void;
  handleEdit: (section: CourseSectionType) => void;
  courseId: string;
  onDragEnd: () => Promise<void>;
};

const DraggableSectionItem = ({
  section,
  index,
  moveSection,
  handleDelete,
  handleEdit,
  courseId,
  onDragEnd,
}: DraggableSectionItemType) => {
  const { t } = useTranslation();
  const { handlerId, isDragging, ref } = useDND({
    index,
    itemId: section.id,
    itemType: 'SECTION',
    moveItem: moveSection,
    onDragEnd,
  });

  return (
    <Box
      ref={ref}
      data-handler-id={handlerId}
      sx={{
        opacity: isDragging ? 0.4 : 1,
        background: isDragging ? 'lightgrey' : 'inherit',
      }}
    >
      <ListItem sx={{ flexWrap: 'wrap', gap: 1 }}>
        <IconButton sx={{ cursor: 'move', mr: 1 }}>
          <DragIndicatorIcon />
        </IconButton>
        <ListItemText primary={section.denomination} color="text.secondary" />
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <IconButton color="error" size="small" onClick={() => handleDelete(section.id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton color="primary" size="small" onClick={() => handleEdit(section)}>
            <EditIcon />
          </IconButton>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<OpenInNewIcon />}
            size="small"
            LinkComponent={Link}
            to={`/dashboard/courses/update/${courseId}/sections/${section.id}`}
          >
            {t('common.open')}
          </Button>
        </div>
      </ListItem>
      <Divider />
    </Box>
  );
};

export default DraggableSectionItem;
