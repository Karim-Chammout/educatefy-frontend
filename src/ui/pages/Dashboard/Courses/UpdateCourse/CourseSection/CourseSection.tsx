import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Container from '@mui/material/Container';
import DialogActions from '@mui/material/DialogActions';
import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import { useCallback, useContext, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import withScrolling from 'react-dnd-scrolling';
import { TouchBackend } from 'react-dnd-touch-backend';
import { useTranslation } from 'react-i18next';

import {
  EditableCourseSectionDocument,
  EditableCourseSectionQuery,
  SectionFragment,
  useDeleteCourseSectionItemMutation,
  useUpdateCourseSectionItemRanksMutation,
} from '@/generated/graphql';
import { Button, Modal, Typography } from '@/ui/components';
import { InfoState } from '@/ui/compositions';
import { ToasterContext } from '@/ui/context';

import { StyledLink } from '../CourseSections/CourseSections.style';
import { DraggableItem, ItemCreationForm, ItemEditForm } from './composition';

type ItemType = 'lesson';
type SectionItemType = SectionFragment['items'][0];

const contentOptions = [{ id: 'lesson', label: 'Lesson' }];

const ScrollingComponent = withScrolling('div');

const CourseSection = ({ courseId, section }: { courseId: string; section: SectionFragment }) => {
  const { t } = useTranslation();
  const { setToasterVisibility } = useContext(ToasterContext);

  const [isCreateItemModalOpen, setIsCreateItemModalOpen] = useState(false);
  const [isEditItemModalOpen, setIsEditItemModalOpen] = useState(false);
  const [contentType, setContentType] = useState<{ id: ItemType; label: string } | null>(null);
  const [itemToEdit, setItemToEdit] = useState<SectionItemType | null>(null);
  const [sectionItems, setSectionItems] = useState(section.items);
  const [sectionItemIdToDelete, setSectionItemIdToDelete] = useState<null | string>(null);
  const [isDeleteSectionItemModalOpen, setIsDeleteSectionItemModalOpen] = useState(false);

  const [deleteCourseSectionItem] = useDeleteCourseSectionItemMutation();
  const [updateCourseSectionItemRanks] = useUpdateCourseSectionItemRanksMutation();

  const moveSectionItem = useCallback((dragIndex: number, hoverIndex: number) => {
    setSectionItems((prevItems) => {
      const newSectionItems = [...prevItems];
      const [removed] = newSectionItems.splice(dragIndex, 1);
      newSectionItems.splice(hoverIndex, 0, removed);

      // Update ranks after reordering
      return newSectionItems.map((sectionItem, index) => ({
        ...sectionItem,
        rank: index + 1,
      }));
    });
  }, []);

  const handleDragEnd = useCallback(async () => {
    const updates = sectionItems.map((item, index) => ({
      id: item.itemId,
      rank: index + 1,
    }));

    await updateCourseSectionItemRanks({
      variables: {
        sectionItemRanks: updates,
      },
    });
  }, [sectionItems, updateCourseSectionItemRanks]);

  const handleCloseModal = () => {
    setIsCreateItemModalOpen(false);
    setContentType(null);
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

  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const backend = isTouchDevice ? TouchBackend : HTML5Backend;

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
        <Button onClick={() => setIsCreateItemModalOpen(true)} startIcon={<AddCircleOutlineIcon />}>
          {t('common.create')}
        </Button>
      </Box>

      {sectionItems.length > 0 ? (
        <DndProvider backend={backend}>
          <ScrollingComponent>
            <Box sx={{ mt: 2 }}>
              <List>
                {sectionItems.map((item, index) => (
                  <DraggableItem
                    key={item.itemId}
                    sectionItem={item}
                    index={index}
                    moveSectionItem={moveSectionItem}
                    handleDelete={(itemId) => {
                      setSectionItemIdToDelete(itemId);
                      setIsDeleteSectionItemModalOpen(true);
                    }}
                    handleEdit={handleEditItem}
                    courseId={courseId}
                    sectionId={section.id}
                    onDragEnd={handleDragEnd}
                  />
                ))}
              </List>
            </Box>
          </ScrollingComponent>
        </DndProvider>
      ) : (
        <InfoState
          btnLabel={t('courseSection.createItem')}
          btnOnClick={() => setIsCreateItemModalOpen(true)}
          subtitle={t('courseSection.createFirstItem')}
          title={t('courseSection.noItemsYet')}
          icon={<AddCircleOutlineIcon />}
        />
      )}

      {/* Create Item Modal */}
      <Modal
        title={t('courseSection.createItem')}
        open={isCreateItemModalOpen}
        onClose={handleCloseModal}
      >
        <Autocomplete
          options={contentOptions}
          value={contentType}
          onChange={(_event, newValue: any) => setContentType(newValue)}
          renderInput={(params) => (
            <TextField {...params} label={t('courseSection.selectItemType')} />
          )}
        />

        {contentType && (
          <ItemCreationForm
            itemType={contentType.id}
            courseId={courseId}
            sectionId={section.id}
            handleCloseModalCallback={handleCloseModal}
            setSectionItems={setSectionItems}
          />
        )}
      </Modal>

      {/* Edit Item Modal */}
      <Modal
        title={t('sectionItem.editCurriculumItem')}
        open={isEditItemModalOpen}
        onClose={handleCloseEditModal}
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
