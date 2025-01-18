import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Container from '@mui/material/Container';
import DialogActions from '@mui/material/DialogActions';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import {
  EditableCourseDocument,
  EditableCourseFragment,
  EditableCourseQuery,
  useCreateCourseSectionMutation,
  useDeleteCourseSectionMutation,
  useUpdateCourseSectionMutation,
} from '@/generated/graphql';
import { Button, Modal, Typography } from '@/ui/components';

import { StyledLink } from './CourseSections.style';

const CourseSections = ({ course }: { course: EditableCourseFragment }) => {
  const { t } = useTranslation();
  const [sectionDenomination, setSectionDenomination] = useState('');
  const [isPublished, setIsPublished] = useState(true);
  const [editingSection, setEditingSection] = useState<{ id: null | string; isEditing: boolean }>({
    id: null,
    isEditing: false,
  });
  const [isCourseSectionModalOpen, setIsCourseSectionModalOpen] = useState(false);
  const [sectionIdToDelete, setSectionIdToDelete] = useState<null | string>(null);
  const [isDeleteCourseSectionModalOpen, setIsDeleteCourseSectionModalOpen] = useState(false);

  const [createCourseSection, { loading: loadingCreateSection }] = useCreateCourseSectionMutation();
  const [updateCourseSection, { loading: loadingUpateSection }] = useUpdateCourseSectionMutation();
  const [deleteCourseSection] = useDeleteCourseSectionMutation();

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
  };

  const handleCloseModal = () => {
    resetForm();
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

      <Box sx={{ mt: 2 }}>
        <List>
          {course.sections.map((section, index) => (
            <Box key={section.id}>
              <ListItem sx={{ flexWrap: 'wrap', gap: 1 }}>
                <ListItemText
                  primary={`${index + 1}. ${section.denomination}`}
                  color="text.secondary"
                />
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => {
                      setSectionIdToDelete(section.id);
                      setIsDeleteCourseSectionModalOpen(true);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={() => {
                      setEditingSection({ id: section.id, isEditing: true });
                      setSectionDenomination(section.denomination);
                      setIsPublished(section.is_published);
                      setIsCourseSectionModalOpen(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <Button
                    variant="outlined"
                    color="inherit"
                    startIcon={<OpenInNewIcon />}
                    size="small"
                    LinkComponent={Link}
                    to={`/dashboard/courses/update/${course.id}/sections/${section.id}`}
                  >
                    {t('common.open')}
                  </Button>
                </div>
              </ListItem>
              <Divider />
            </Box>
          ))}
        </List>
      </Box>
      <Modal
        title={
          editingSection.isEditing
            ? t('courseSection.updateSection')
            : t('courseSection.createSection')
        }
        open={isCourseSectionModalOpen}
        onClose={handleCloseModal}
        maxWidth="xs"
        CTAs={
          <DialogActions>
            <Button onClick={handleCloseModal} variant="outlined" fullWidth>
              {t('common.cancel')}
            </Button>
            <Button
              onClick={handleCourseSectionSave}
              disabled={!sectionDenomination.trim() || loadingUpateSection || loadingCreateSection}
              fullWidth
            >
              {t('common.confirm')}
            </Button>
          </DialogActions>
        }
      >
        <TextField
          label={t('courseSection.sectionName')}
          value={sectionDenomination}
          onChange={(e) => setSectionDenomination(e.target.value)}
          fullWidth
          required
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
