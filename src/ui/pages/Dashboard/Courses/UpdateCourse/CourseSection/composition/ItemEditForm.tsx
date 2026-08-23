import { Dispatch, SetStateAction } from 'react';

import { SectionFragment } from '@/generated/graphql';

import LessonEditForm from './LessonEditForm';

type SectionItemType = SectionFragment['items'][0];
type LessonItem = Extract<SectionItemType, { __typename: 'Lesson' }>;

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
  return (
    <LessonEditForm
      item={item as LessonItem}
      courseId={courseId}
      sectionId={sectionId}
      handleCloseModalCallback={handleCloseModalCallback}
      setSectionItems={setSectionItems}
    />
  );
};

export default ItemEditForm;
