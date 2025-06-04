import { Dispatch, SetStateAction } from 'react';

import { SectionFragment } from '@/generated/graphql';

import LessonEditForm from './LessonEditForm';

type SectionItemType = SectionFragment['items'][0];

const ItemEditForm = ({
  item,
  courseId,
  sectionId,
  setSectionItems,
  handleCloseModalCallback,
}: {
  item: SectionItemType;
  courseId: string;
  sectionId: string;
  setSectionItems: Dispatch<SetStateAction<SectionFragment['items']>>;
  handleCloseModalCallback: () => void;
}) => {
  const getItemType = (editItem: SectionItemType): SectionItemType['__typename'] => {
    switch (editItem.__typename) {
      case 'Lesson':
        return 'Lesson';

      default:
        throw new Error(`Unknown item type for item: ${item.__typename}`);
    }
  };

  const itemType = getItemType(item);

  switch (itemType) {
    case 'Lesson':
      return (
        <LessonEditForm
          item={item}
          courseId={courseId}
          sectionId={sectionId}
          handleCloseModalCallback={handleCloseModalCallback}
          setSectionItems={setSectionItems}
        />
      );

    default:
      return null;
  }
};

export default ItemEditForm;
