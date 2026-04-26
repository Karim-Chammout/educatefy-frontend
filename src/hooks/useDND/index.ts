import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type UseDNDPropsType = {
  itemId: string;
};

const useDND = ({ itemId }: UseDNDPropsType) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: itemId,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    background: isDragging ? 'lightgrey' : 'inherit',
  };

  return { setNodeRef, style, attributes, listeners, isDragging };
};

export default useDND;
