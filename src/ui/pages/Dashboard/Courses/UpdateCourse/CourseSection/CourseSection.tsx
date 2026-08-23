import { useMutation } from '@apollo/client/react';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutlined';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Container from '@mui/material/Container';
import DialogActions from '@mui/material/DialogActions';
import List from '@mui/material/List';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import {
  DeleteCourseSectionItemDocument,
  EditableCourseSectionDocument,
  EditableCourseSectionQuery,
  SectionFragment,
  UpdateCourseSectionItemRanksDocument,
} from '@/generated/graphql';
import { Button, Modal, Typography } from '@/ui/components';
import { InfoState } from '@/ui/compositions';
import { ToasterContext } from '@/ui/context';

import { StyledLink } from '../CourseSections/CourseSections.style';
import { DraggableItem, ItemCreationForm, ItemEditForm } from './composition';

type SectionItemType = SectionFragment['items'][0];

const CourseSection = ({ courseId, section }: { courseId: string; section: SectionFragment }) => {
  const { t } = useTranslation();
  const { setToasterVisibility } = useContext(ToasterContext);
  const navigate = useNavigate();

  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

  const [isEditItemModalOpen, setIsEditItemModalOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<SectionItemType | null>(null);
  const [sectionItems, setSectionItems] = useState(section.items);
  const [sectionItemIdToDelete, setSectionItemIdToDelete] = useState<null | string>(null);
  const [isDeleteSectionItemModalOpen, setIsDeleteSectionItemModalOpen] = useState(false);

  const [createMenuAnchor, setCreateMenuAnchor] = useState<null | HTMLElement>(null);

  const [deleteCourseSectionItem] = useMutation(DeleteCourseSectionItemDocument);
  const [updateCourseSectionItemRanks] = useMutation(UpdateCourseSectionItemRanksDocument);

  const [isCreateItemModalOpen, setIsCreateItemModalOpen] = useState(false);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setSectionItems((items) => {
        const oldIndex = items.findIndex((i) => i.itemId === active.id);
        const newIndex = items.findIndex((i) => i.itemId === over?.id);
        const reordered = arrayMove(items, oldIndex, newIndex);

        updateCourseSectionItemRanks({
          variables: {
            sectionItemRanks: reordered.map((item, idx) => ({ id: item.itemId, rank: idx + 1 })),
          },
        });

        return reordered;
      });
    }
  };

  const handleCloseCreateModal = () => {
    setIsCreateItemModalOpen(false);
  };

  const handleCloseEditModal = () => {
    setIsEditItemModalOpen(false);
    setItemToEdit(null);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteSectionItemModalOpen(false);
    setSectionItemIdToDelete(null);
  };

  const handleEditItem = (item: SectionItemType) => {
    setItemToEdit(item);
    setIsEditItemModalOpen(true);
  };

  const handleDeleteCourseSectionItem = async () => {
    if (!sectionItemIdToDelete) return;

    await deleteCourseSectionItem({
      variables: {
        id: sectionItemIdToDelete,
      },
      onCompleted(res) {
        if (res.deleteCourseSectionItem?.success) {
          handleCloseDeleteModal();

          setSectionItems((prevItems) =>
            prevItems.filter((item) => item.itemId !== sectionItemIdToDelete),
          );
        }

        setToasterVisibility({
          newDuration: 5000,
          newText: t('courseSection.itemDeleted'),
          newType: 'success',
        });
      },
      update(cache, res) {
        if (res.data?.deleteCourseSectionItem?.success) {
          const existingCourseQuery = cache.readQuery<EditableCourseSectionQuery>({
            query: EditableCourseSectionDocument,
            variables: { id: courseId },
          });

          if (!existingCourseQuery?.editableCourse) return null;

          cache.writeQuery({
            query: EditableCourseSectionDocument,
            variables: { id: courseId },
            data: {
              __typename: 'Query',
              editableCourse: {
                ...existingCourseQuery.editableCourse,
                sections: existingCourseQuery.editableCourse.sections.map((s) => ({
                  ...s,
                  items: s.items.filter((item) => item.itemId !== sectionItemIdToDelete),
                })),
              },
            },
          });
        }
      },
    });
  };

  const handleCreateLesson = () => {
    setCreateMenuAnchor(null);
    setIsCreateItemModalOpen(true);
  };

  const handleCreateQuiz = () => {
    setCreateMenuAnchor(null);
    navigate(`/dashboard/courses/update/${courseId}/sections/${section.id}/item/quiz/create`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4, pb: 10 }}>
      <Breadcrumbs>
        <StyledLink to={`/dashboard/courses/update/${courseId}`}>
          {t('courseSection.backToCourse')}
        </StyledLink>
        <StyledLink to={`/dashboard/courses/update/${courseId}/sections`}>
          {t('courseSection.sections')}
        </StyledLink>
        <StyledLink to={`/dashboard/courses/update/${courseId}/sections/${section.id}`} isCurrent>
          {section.denomination}
        </StyledLink>
      </Breadcrumbs>

      <Box
        sx={{
          mt: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h4">
          {t('courseSection.curriculumItems')}
        </Typography>
        <Box
          component="span"
          role="button"
          tabIndex={0}
          onClick={(e) => setCreateMenuAnchor(e.currentTarget)}
        >
          <Button startIcon={<AddCircleOutlineIcon />}>{t('common.create')}</Button>
        </Box>
      </Box>

      <Menu
        anchorEl={createMenuAnchor}
        open={Boolean(createMenuAnchor)}
        onClose={() => setCreateMenuAnchor(null)}
      >
        <MenuItem onClick={handleCreateLesson}>{t('courseSection.createLesson')}</MenuItem>
        <MenuItem onClick={handleCreateQuiz}>{t('courseSection.createQuiz')}</MenuItem>
      </Menu>

      {sectionItems.length > 0 ? (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext
            items={sectionItems.map((i) => i.itemId)}
            strategy={verticalListSortingStrategy}
          >
            <Box sx={{ mt: 2 }}>
              <List>
                {sectionItems.map((item) => (
                  <DraggableItem
                    key={item.itemId}
                    sectionItem={item}
                    handleDelete={(itemId) => {
                      setSectionItemIdToDelete(itemId);
                      setIsDeleteSectionItemModalOpen(true);
                    }}
                    handleEdit={handleEditItem}
                    courseId={courseId}
                    sectionId={section.id}
                  />
                ))}
              </List>
            </Box>
          </SortableContext>
        </DndContext>
      ) : (
        <InfoState
          btnLabel={t('courseSection.createItem')}
          btnOnClick={(e) => {
            setCreateMenuAnchor(e.currentTarget);
          }}
          subtitle={t('courseSection.createFirstItem')}
          title={t('courseSection.noItemsYet')}
          icon={<AddCircleOutlineIcon />}
        />
      )}

      <Modal
        title={t('courseSection.createItem')}
        open={isCreateItemModalOpen}
        onClose={handleCloseCreateModal}
        maxWidth="md"
      >
        <ItemCreationForm
          itemType="lesson"
          courseId={courseId}
          sectionId={section.id}
          handleCloseModalCallback={handleCloseCreateModal}
          setSectionItems={setSectionItems}
        />
      </Modal>

      {/* Edit Item Modal */}
      <Modal
        title={t('sectionItem.editCurriculumItem')}
        open={isEditItemModalOpen}
        onClose={handleCloseEditModal}
        maxWidth="md"
      >
        {itemToEdit && (
          <ItemEditForm
            item={itemToEdit}
            courseId={courseId}
            sectionId={section.id}
            handleCloseModalCallback={handleCloseEditModal}
            setSectionItems={setSectionItems}
          />
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        title={t('courseSection.deleteItemConfirmation')}
        open={isDeleteSectionItemModalOpen}
        onClose={handleCloseDeleteModal}
        maxWidth="xs"
        CTAs={
          <DialogActions>
            <Button onClick={handleCloseDeleteModal} variant="outlined" fullWidth>
              {t('common.cancel')}
            </Button>
            <Button color="error" onClick={handleDeleteCourseSectionItem} fullWidth>
              {t('common.confirm')}
            </Button>
          </DialogActions>
        }
      />
    </Container>
  );
};

export default CourseSection;
