import { Dispatch, SetStateAction } from 'react';

import { SectionFragment } from '@/generated/graphql';

import LessonEditForm from './LessonEditForm';
import QuizBuilderForm from './QuizBuilderForm';

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
  if (item.__typename === 'Quiz') {
    return (
      <QuizBuilderForm
        mode="edit"
        item={item}
        courseId={courseId}
        sectionId={sectionId}
        handleCloseModalCallback={handleCloseModalCallback}
        setSectionItems={setSectionItems}
      />
    );
  }

  return (
    <LessonEditForm
      item={item}
      courseId={courseId}
      sectionId={sectionId}
      handleCloseModalCallback={handleCloseModalCallback}
      setSectionItems={setSectionItems}
    />
  );
};

export default ItemEditForm;
