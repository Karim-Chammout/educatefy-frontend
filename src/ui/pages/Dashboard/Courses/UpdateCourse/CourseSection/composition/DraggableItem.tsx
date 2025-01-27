import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { SectionFragment } from '@/generated/graphql';
import { useDND } from '@/hooks';
import { Button } from '@/ui/components';

type SectionItemType = SectionFragment['items'][0];

type DraggableItemType = {
  sectionItem: SectionItemType;
  index: number;
  moveSectionItem: (dragIndex: number, hoverIndex: number) => void;
  handleDelete: (itemId: string) => void;
  courseId: string;
  sectionId: string;
  onDragEnd: () => Promise<void>;
};

const DraggableItem = ({
  sectionItem,
  index,
  moveSectionItem,
  handleDelete,
  courseId,
  sectionId,
  onDragEnd,
}: DraggableItemType) => {
  const { t } = useTranslation();
  const { handlerId, isDragging, ref } = useDND({
    index,
    itemId: sectionItem.itemId,
    itemType: 'SECTION_ITEM',
    moveItem: moveSectionItem,
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
        <ListItemText primary={sectionItem.denomination} color="text.secondary" />
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <IconButton color="error" size="small" onClick={() => handleDelete(sectionItem.itemId)}>
            <DeleteIcon />
          </IconButton>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<OpenInNewIcon />}
            size="small"
            LinkComponent={Link}
            to={`/dashboard/courses/update/${courseId}/sections/${sectionId}/item/${sectionItem.itemId}`}
          >
            {t('common.open')}
          </Button>
        </div>
      </ListItem>
      <Divider />
    </Box>
  );
};

export default DraggableItem;
