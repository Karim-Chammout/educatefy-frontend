import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

type DragItemType = {
  index: number;
  id: string;
  type: string;
};

type UseDNDPropsType = {
  index: number;
  itemId: string;
  itemType: string;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
  onDragEnd: () => Promise<void>;
};

const useDND = ({ index, itemId, itemType, moveItem, onDragEnd }: UseDNDPropsType) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop<DragItemType, void, { handlerId: string | symbol | null }>({
    accept: itemType,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) return;

      // Get rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Get mouse position
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: itemType,
    item: () => ({
      id: itemId,
      index,
      type: itemType,
    }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: async (_item, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        await onDragEnd();
      }
    },
  });

  // Initialize drag and drop refs
  drag(drop(ref));

  return {
    ref,
    isDragging,
    handlerId,
  };
};

export default useDND;
