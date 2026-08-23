import { Dispatch, SetStateAction } from 'react';

import { SectionFragment } from '@/generated/graphql';

import LessonCreationForm from './LessonCreationForm';

type ItemType = 'lesson';

const ItemCreationForm = ({
  itemType: _itemType,
  courseId,
  sectionId,
  setSectionItems,
  handleCloseModalCallback,
}: {
  itemType: ItemType;
  courseId: string;
  sectionId: string;
  setSectionItems: Dispatch<SetStateAction<SectionFragment['items']>>;
  handleCloseModalCallback: () => void;
}) => {
  return (
    <LessonCreationForm
      courseId={courseId}
      sectionId={sectionId}
      handleCloseModalCallback={handleCloseModalCallback}
      setSectionItems={setSectionItems}
    />
  );
};

export default ItemCreationForm;
