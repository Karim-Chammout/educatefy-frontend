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
  handleDelete: (id: string) => void;
  handleEdit: (section: CourseSectionType) => void;
  courseId: string;
};

const DraggableSectionItem = ({
  section,
  handleDelete,
  handleEdit,
  courseId,
}: DraggableSectionItemType) => {
  const { t } = useTranslation();
  const { setNodeRef, style, attributes, listeners } = useDND({
    itemId: section.id,
  });

  return (
    <Box
      ref={setNodeRef}
      sx={{
        ...style,
      }}
    >
      <ListItem sx={{ flexWrap: 'wrap', gap: 1 }}>
        <IconButton sx={{ cursor: 'move', mr: 1 }} {...attributes} {...listeners}>
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
