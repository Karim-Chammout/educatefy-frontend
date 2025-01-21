import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Container from '@mui/material/Container';
import DialogActions from '@mui/material/DialogActions';
import FormControlLabel from '@mui/material/FormControlLabel';
import List from '@mui/material/List';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import { useCallback, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import withScrolling from 'react-dnd-scrolling';
import { TouchBackend } from 'react-dnd-touch-backend';
import { useTranslation } from 'react-i18next';

import {
  EditableCourseDocument,
  EditableCourseFragment,
  EditableCourseQuery,
  useCreateCourseSectionMutation,
  useDeleteCourseSectionMutation,
  useUpdateCourseSectionMutation,
  useUpdateCourseSectionRanksMutation,
} from '@/generated/graphql';
import { Button, Modal, Typography } from '@/ui/components';

import { StyledLink } from './CourseSections.style';
import { DraggableSectionItem } from './composition';
import { InfoState } from '@/ui/compositions';

type CourseSectionType = EditableCourseFragment['sections'][0];

const ScrollingComponent = withScrolling('div');

const CourseSections = ({ course }: { course: EditableCourseFragment }) => {
  const { t } = useTranslation();

  const [sectionDenomination, setSectionDenomination] = useState('');
  const [isPublished, setIsPublished] = useState(true);
  const [editingSection, setEditingSection] = useState<{ id: null | string; isEditing: boolean }>({
    id: null,
    isEditing: false,
  });
  const [sections, setSections] = useState(course.sections);
  const [isCourseSectionModalOpen, setIsCourseSectionModalOpen] = useState(false);
  const [sectionIdToDelete, setSectionIdToDelete] = useState<null | string>(null);
  const [isDeleteCourseSectionModalOpen, setIsDeleteCourseSectionModalOpen] = useState(false);

  const [createCourseSection, { loading: loadingCreateSection }] = useCreateCourseSectionMutation();
  const [updateCourseSection, { loading: loadingUpdateSection }] = useUpdateCourseSectionMutation();
  const [deleteCourseSection] = useDeleteCourseSectionMutation();
  const [updateCourseSectionRanks] = useUpdateCourseSectionRanksMutation();

  const resetForm = () => {
    setSectionDenomination('');
    setIsCourseSectionModalOpen(false);
    setEditingSection({ id: null, isEditing: false });
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteCourseSectionModalOpen(false);
    setSectionIdToDelete(null);
  };

  const moveSection = useCallback((dragIndex: number, hoverIndex: number) => {
    setSections((prevSections) => {
      const newSections = [...prevSections];
      const [removed] = newSections.splice(dragIndex, 1);
      newSections.splice(hoverIndex, 0, removed);

      // Update ranks after reordering
      return newSections.map((section, index) => ({
        ...section,
        rank: index + 1,
      }));
    });
  }, []);

  const handleCourseSectionSave = async () => {
    if (!sectionDenomination.trim()) return;

    if (editingSection.isEditing && editingSection.id) {
      await updateCourseSection({
        variables: {
          courseSectionInfo: {
            id: editingSection.id,
            denomination: sectionDenomination,
            is_published: isPublished,
          },
        },
      });

      const updatedSections = sections.map((section) =>
        section.id === editingSection.id
          ? { ...section, denomination: sectionDenomination, is_published: isPublished }
          : section,
      );
      setSections(updatedSections);
    } else {
      await createCourseSection({
        variables: {
          courseSectionInfo: {
            courseId: course.id,
            denomination: sectionDenomination,
            is_published: isPublished,
          },
        },
        update(cache, res) {
          const data = res.data?.createCourseSection;
          if (data) {
            const existingCourseQuery = cache.readQuery<EditableCourseQuery>({
              query: EditableCourseDocument,
              variables: { id: course.id },
            });

            if (!existingCourseQuery?.editableCourse) return null;

            cache.writeQuery({
              query: EditableCourseDocument,
              variables: { id: course.id },
              data: {
                editableCourse: {
                  ...existingCourseQuery.editableCourse,
                  sections: [...existingCourseQuery.editableCourse.sections, data.courseSection],
                },
              },
            });

            setSections((prevSections) => [
              ...prevSections,
              data.courseSection as CourseSectionType,
            ]);
          }
        },
      });
    }

    resetForm();
  };

  const handleDeleteCourseSection = async () => {
    if (!sectionIdToDelete) return;

    await deleteCourseSection({
      variables: {
        id: sectionIdToDelete,
      },
      update(cache, res) {
        if (res.data?.deleteCourseSection?.success) {
          const existingCourseQuery = cache.readQuery<EditableCourseQuery>({
            query: EditableCourseDocument,
            variables: { id: course.id },
          });

          if (!existingCourseQuery?.editableCourse) return null;

          cache.writeQuery({
            query: EditableCourseDocument,
            variables: { id: course.id },
            data: {
              editableCourse: {
                ...existingCourseQuery.editableCourse,
                sections: existingCourseQuery.editableCourse.sections.filter(
                  (section) => section.id !== sectionIdToDelete,
                ),
              },
            },
          });
        }
      },
    });

    handleCloseDeleteModal();

    setSections((prevSections) =>
      prevSections.filter((section) => section.id !== sectionIdToDelete),
    );
  };

  const handleDragEnd = useCallback(async () => {
    const updates = sections.map((section, index) => ({
      id: section.id,
      rank: index + 1,
    }));

    await updateCourseSectionRanks({
      variables: {
        sectionRanks: updates,
      },
    });
  }, [sections, updateCourseSectionRanks]);

  const handleEdit = (section: CourseSectionType) => {
    setEditingSection({ id: section.id, isEditing: true });
    setSectionDenomination(section.denomination);
    setIsPublished(section.is_published);
    setIsCourseSectionModalOpen(true);
  };

  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const backend = isTouchDevice ? TouchBackend : HTML5Backend;

  return (
    <Container maxWidth="lg" sx={{ py: 4, pb: 10 }}>
      <div>
        <Breadcrumbs>
          <StyledLink to={`/dashboard/courses/update/${course.id}`}>
            {t('courseSection.backToCourse')}
          </StyledLink>
          <StyledLink to={`/dashboard/courses/update/${course.id}/sections`} isCurrent>
            {t('courseSection.sections')}
          </StyledLink>
        </Breadcrumbs>
      </div>
      <Box
        sx={{
          mt: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h4">
          {t('courseSection.sections')}
        </Typography>
        <Button
          onClick={() => setIsCourseSectionModalOpen(true)}
          startIcon={<AddCircleOutlineIcon />}
        >
          {t('common.create')}
        </Button>
      </Box>

      {sections.length > 0 ? (
        <DndProvider backend={backend}>
          <ScrollingComponent>
            <Box sx={{ mt: 2 }}>
              <List>
                {sections.map((section, index) => (
                  <DraggableSectionItem
                    key={section.id}
                    section={section}
                    index={index}
                    moveSection={moveSection}
                    handleDelete={(id) => {
                      setSectionIdToDelete(id);
                      setIsDeleteCourseSectionModalOpen(true);
                    }}
                    handleEdit={handleEdit}
                    courseId={course.id}
                    onDragEnd={handleDragEnd}
                  />
                ))}
              </List>
            </Box>
          </ScrollingComponent>
        </DndProvider>
      ) : (
        <InfoState
          btnLabel="Create"
          btnOnClick={() => setIsCourseSectionModalOpen(true)}
          subtitle="Create sections to organize your course content"
          title="No sections created yet"
          icon={<AddCircleOutlineIcon />}
        />
      )}

      <Modal
        title={
          editingSection.isEditing
            ? t('courseSection.updateSection')
            : t('courseSection.createSection')
        }
        open={isCourseSectionModalOpen}
        onClose={resetForm}
        maxWidth="xs"
        CTAs={
          <DialogActions>
            <Button onClick={resetForm} variant="outlined" fullWidth>
              {t('common.cancel')}
            </Button>
            <Button
              onClick={handleCourseSectionSave}
              disabled={!sectionDenomination.trim() || loadingUpdateSection || loadingCreateSection}
              fullWidth
            >
              {t('common.confirm')}
            </Button>
          </DialogActions>
        }
        disableRestoreFocus
      >
        <TextField
          label={t('courseSection.sectionName')}
          value={sectionDenomination}
          onChange={(e) => setSectionDenomination(e.target.value)}
          fullWidth
          required
          autoFocus
        />
        <FormControlLabel
          control={
            <Switch
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              title={t('courseSection.isPublished')}
            />
          }
          label={t('courseSection.isPublished')}
        />
      </Modal>
      <Modal
        title={t('courseSection.confirmDeleteSection')}
        open={isDeleteCourseSectionModalOpen}
        onClose={handleCloseDeleteModal}
        maxWidth="xs"
        CTAs={
          <DialogActions>
            <Button onClick={handleCloseDeleteModal} variant="outlined" fullWidth>
              {t('common.cancel')}
            </Button>
            <Button color="error" onClick={handleDeleteCourseSection} fullWidth>
              {t('common.confirm')}
            </Button>
          </DialogActions>
        }
      />
    </Container>
  );
};

export default CourseSections;
