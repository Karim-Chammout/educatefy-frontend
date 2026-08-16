import { Dispatch, SetStateAction } from 'react';

import { SectionFragment } from '@/generated/graphql';

import LessonCreationForm from './LessonCreationForm';
import QuizBuilderForm from './QuizBuilderForm';

type ItemType = 'lesson' | 'quiz';

const ItemCreationForm = ({
  itemType,
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
  switch (itemType) {
    case 'lesson':
      return (
        <LessonCreationForm
          courseId={courseId}
          sectionId={sectionId}
          handleCloseModalCallback={handleCloseModalCallback}
          setSectionItems={setSectionItems}
        />
      );

    case 'quiz':
      return (
        <QuizBuilderForm
          mode="create"
          courseId={courseId}
          sectionId={sectionId}
          setSectionItems={setSectionItems}
          handleCloseModalCallback={handleCloseModalCallback}
        />
      );

    default:
      return null;
  }
};

export default ItemCreationForm;
