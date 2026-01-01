import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import { useContext, useState } from 'react';
import { FieldValues, FormContainer, SwitchElement } from 'react-hook-form-mui';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import {
  EditableProgramFragment,
  SubjectFragment,
  useDeleteProgramMutation,
  useUpdateProgramMutation,
} from '@/generated/graphql';
import { Button, Typography } from '@/ui/components';
import { ToasterContext } from '@/ui/context';
import { isValidSlug } from '@/utils/isValidSlug';
import { getS3FilePathFromUrl } from '@/utils/s3';
import { ServerErrorType } from '@/utils/ServerErrorType';

import {
  BasicInfoSection,
  DeleteConfirmationModal,
  LearningOutcomesSection,
  ProgramImageSection,
  RequirementsSection,
} from './composition';
import { useUpdateProgramForm } from './hooks/useUpdateProgramForm';

type UpdateProgramType = {
  program: EditableProgramFragment;
  subjectsList: SubjectFragment[];
};

const UpdateProgram = ({ program, subjectsList }: UpdateProgramType) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setToasterVisibility } = useContext(ToasterContext);

  const [descriptionContent, setDescriptionContent] = useState(program.description);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);

  const [updateProgram, { loading: updateProgramLoading }] = useUpdateProgramMutation();
  const [deleteProgram] = useDeleteProgramMutation();

  const {
    control,
    handleSubmit,
    watchedValues,
    isFormValid,
    currentImage,
    isImageLoading,
    handleFileSelect,
    handleRemoveImage,
    objectivesList,
    objectiveItem,
    setObjectiveItem,
    handleAddObjective,
    handleDeleteObjective,
    requirementsList,
    requirementItem,
    setRequirementItem,
    handleAddRequirement,
    handleDeleteRequirement,
  } = useUpdateProgramForm({
    program,
    descriptionContent,
  });

  const onSubmit = async (values: FieldValues) => {
    if (!isValidSlug(values.slug)) {
      setToasterVisibility({
        newDuration: 5000,
        newText: t('form.invalidSlug'),
        newType: 'error',
      });

      return;
    }

    if (
      !values.denomination ||
      !values.slug ||
      !values.subtitle ||
      !descriptionContent ||
      !values.level ||
      !values.subjects ||
      values.subjects.length === 0 ||
      !objectivesList ||
      (objectivesList && objectivesList.length === 0) ||
      !requirementsList ||
      (requirementsList && requirementsList.length === 0)
    ) {
      setToasterVisibility({
        newDuration: 5000,
        newText: t('form.fillRequiredFields'),
        newType: 'error',
      });

      return;
    }

    const imageToUpdate = currentImage ? getS3FilePathFromUrl(currentImage) : null;

    const subjectIds = values.subjects.map((subject: { id: string }) => subject.id);
    const objectives = objectivesList.map((item) => ({
      id: item.id,
      objective: item.objective,
    }));
    const requirements = requirementsList.map((item) => ({
      id: item.id,
      requirement: item.requirement,
    }));

    await updateProgram({
      variables: {
        updateProgramInfo: {
          id: program.id,
          denomination: values.denomination,
          slug: values.slug,
          subtitle: values.subtitle,
          description: descriptionContent,
          is_published: values.isPublished ?? false,
          level: values.level?.id || values.level,
          image: imageToUpdate,
          subjectIds,
          objectives,
          requirements,
        },
      },
      onCompleted(data) {
        if (data.updateProgram?.success) {
          setToasterVisibility({
            newDuration: 3000,
            newText: t('program.updateSuccess'),
            newType: 'success',
          });
        } else if (data.updateProgram?.errors[0].message === ServerErrorType.SLUG_ALREADY_TAKEN) {
          setToasterVisibility({
            newDuration: null,
            newText: t('program.slugTaken'),
            newType: 'error',
          });
        } else {
          setToasterVisibility({
            newDuration: 5000,
            newText: t('program.updateError'),
            newType: 'error',
          });
        }
      },
    });
  };

  const handleDeleteProgram = async () => {
    await deleteProgram({
      variables: { id: program.id },
      onCompleted(data) {
        if (data.deleteProgram?.success) {
          setToasterVisibility({
            newDuration: 3000,
            newText: t('program.deleteSuccess'),
            newType: 'success',
          });
          navigate('/dashboard/programs');
        }
      },
      update(cache, res) {
        if (res.data?.deleteProgram?.success) {
          cache.evict({ id: `Program:${program.id}` });
        }
      },
    });
  };

  const sortedSubjectsList = [...subjectsList].sort((a, b) =>
    a.denomination.localeCompare(b.denomination),
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4, pb: 10 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t('course.updateTitle')}
        </Typography>
        <Button variant="outlined" onClick={() => navigate('/dashboard/programs')}>
          {t('common.cancel')}
        </Button>
      </Box>

      {/* @ts-expect-error FIXME: Check why the onSuccess prop is throwing type error */}
      <FormContainer onSuccess={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <BasicInfoSection
            control={control}
            subjectsList={sortedSubjectsList}
            watchedValues={watchedValues}
            descriptionContent={descriptionContent}
            setDescriptionContent={setDescriptionContent}
          />

          <ProgramImageSection
            currentImage={currentImage}
            isImageLoading={isImageLoading}
            onFileSelect={handleFileSelect}
            onRemoveImage={handleRemoveImage}
          />

          <LearningOutcomesSection
            objectivesList={objectivesList}
            objectiveItem={objectiveItem}
            setObjectiveItem={setObjectiveItem}
            onAddObjective={handleAddObjective}
            onDeleteObjective={handleDeleteObjective}
          />

          <RequirementsSection
            requirementsList={requirementsList}
            requirementItem={requirementItem}
            setRequirementItem={setRequirementItem}
            onAddRequirement={handleAddRequirement}
            onDeleteRequirement={handleDeleteRequirement}
          />

          <Paper elevation={0} variant="outlined" sx={{ p: 3 }}>
            <FormControlLabel
              control={
                <SwitchElement
                  name="isPublished"
                  control={control}
                  label={t('common.isPublished')}
                />
              }
              label=""
              sx={{ ml: 1 }}
            />
          </Paper>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
            <Button color="error" onClick={() => setIsConfirmDeleteModalOpen(true)}>
              {t('common.delete')}
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!isFormValid || isImageLoading || updateProgramLoading}
            >
              {t('common.update')}
            </Button>
          </Box>
        </Box>
      </FormContainer>

      <DeleteConfirmationModal
        open={isConfirmDeleteModalOpen}
        onClose={() => setIsConfirmDeleteModalOpen(false)}
        onConfirm={handleDeleteProgram}
      />
    </Container>
  );
};

export default UpdateProgram;
