import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import {
  ComponentType as ComponentEnumType,
  EditableTextContentComponentFragment,
  EditableVideoContentComponentFragment,
} from '@/generated/graphql';
import { useDND } from '@/hooks';

type ComponentType = EditableTextContentComponentFragment | EditableVideoContentComponentFragment;

type DraggableComponentItemType = {
  componentItem: ComponentType;
  index: number;
  moveComponentItem: (dragIndex: number, hoverIndex: number) => void;
  handleDelete: (id: string, type: ComponentEnumType) => void;
  handleEdit: (id: string) => void;
  onDragEnd: () => Promise<void>;
};

const DraggableComponentItem = ({
  componentItem,
  index,
  moveComponentItem,
  handleDelete,
  handleEdit,
  onDragEnd,
}: DraggableComponentItemType) => {
  const { handlerId, isDragging, ref } = useDND({
    index,
    itemId: componentItem.component_id,
    itemType: 'COMPONENT_ITEM',
    moveItem: moveComponentItem,
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
        <ListItemText primary={componentItem.denomination} color="text.secondary" />
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <IconButton
            color="error"
            size="small"
            onClick={() => handleDelete(componentItem.component_id, componentItem.type)}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            color="primary"
            size="small"
            onClick={() => handleEdit(componentItem.component_id)}
          >
            <EditIcon />
          </IconButton>
        </div>
      </ListItem>
      <Divider />
    </Box>
  );
};

export default DraggableComponentItem;
