import { useMutation } from '@apollo/client/react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutlined';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Container from '@mui/material/Container';
import DialogActions from '@mui/material/DialogActions';
import FormControlLabel from '@mui/material/FormControlLabel';
import List from '@mui/material/List';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';

import { useTranslation } from 'react-i18next';

import {
  CreateCourseSectionDocument,
  DeleteCourseSectionDocument,
  EditableCourseSectionFragment,
  EditableCourseSectionsDocument,
  EditableCourseSectionsQuery,
  UpdateCourseSectionDocument,
  UpdateCourseSectionRanksDocument,
} from '@/generated/graphql';
import { Button, Modal, Typography } from '@/ui/components';

import { StyledLink } from './CourseSections.style';
import { DraggableSectionItem } from './composition';
import { InfoState } from '@/ui/compositions';

type CourseSectionType = EditableCourseSectionFragment['sections'][0];

const CourseSections = ({ course }: { course: EditableCourseSectionFragment }) => {
  const { t } = useTranslation();

  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

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

  const [createCourseSection, { loading: loadingCreateSection }] = useMutation(
    CreateCourseSectionDocument,
  );
  const [updateCourseSection, { loading: loadingUpdateSection }] = useMutation(
    UpdateCourseSectionDocument,
  );
  const [deleteCourseSection] = useMutation(DeleteCourseSectionDocument);
  const [updateCourseSectionRanks] = useMutation(UpdateCourseSectionRanksDocument);

  const resetForm = () => {
    setSectionDenomination('');
    setIsCourseSectionModalOpen(false);
    setEditingSection({ id: null, isEditing: false });
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteCourseSectionModalOpen(false);
    setSectionIdToDelete(null);
  };

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
          if (data && data.courseSection) {
            const existingCourseQuery = cache.readQuery<EditableCourseSectionsQuery>({
              query: EditableCourseSectionsDocument,
              variables: { id: course.id },
            });

            if (!existingCourseQuery?.editableCourse) return null;

            cache.writeQuery({
              query: EditableCourseSectionsDocument,
              variables: { id: course.id },
              data: {
                __typename: 'Query',
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
          const existingCourseQuery = cache.readQuery<EditableCourseSectionsQuery>({
            query: EditableCourseSectionsDocument,
            variables: { id: course.id },
          });

          if (!existingCourseQuery?.editableCourse) return null;

          cache.writeQuery({
            query: EditableCourseSectionsDocument,
            variables: { id: course.id },
            data: {
              __typename: 'Query',
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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setSections((secs) => {
        const oldIndex = secs.findIndex((i) => i.id === active.id);
        const newIndex = secs.findIndex((i) => i.id === over?.id);
        const reordered = arrayMove(secs, oldIndex, newIndex);

        updateCourseSectionRanks({
          variables: {
            sectionRanks: reordered.map((section, idx) => ({ id: section.id, rank: idx + 1 })),
          },
        });

        return reordered;
      });
    }
  };

  const handleEdit = (section: CourseSectionType) => {
    setEditingSection({ id: section.id, isEditing: true });
    setSectionDenomination(section.denomination);
    setIsPublished(section.is_published);
    setIsCourseSectionModalOpen(true);
  };

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
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
            <Box sx={{ mt: 2 }}>
              <List>
                {sections.map((section) => (
                  <DraggableSectionItem
                    key={section.id}
                    section={section}
                    handleDelete={(id) => {
                      setSectionIdToDelete(id);
                      setIsDeleteCourseSectionModalOpen(true);
                    }}
                    handleEdit={handleEdit}
                    courseId={course.id}
                  />
                ))}
              </List>
            </Box>
          </SortableContext>
        </DndContext>
      ) : (
        <InfoState
          btnLabel={t('common.create')}
          btnOnClick={() => setIsCourseSectionModalOpen(true)}
          subtitle={t('courseSection.noSectionYetSubtitle')}
          title={t('courseSection.noSectionYetTitle')}
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
