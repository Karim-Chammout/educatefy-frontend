import LessonCreationForm from './LessonCreationForm';

type ItemType = 'lesson';

const ItemCreationForm = ({
  itemType,
  courseId,
  sectionId,
  handleCloseModalCallback,
}: {
  itemType: ItemType;
  courseId: string;
  sectionId: string;
  handleCloseModalCallback: () => void;
}) => {
  switch (itemType) {
    case 'lesson':
      return (
        <LessonCreationForm
          courseId={courseId}
          sectionId={sectionId}
          handleCloseModalCallback={handleCloseModalCallback}
        />
      );

    default:
      return null;
  }
};

export default ItemCreationForm;
