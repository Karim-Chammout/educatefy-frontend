import Box from '@mui/material/Box';
import DialogActions from '@mui/material/DialogActions';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useContext } from 'react';
import {
  FieldValues,
  FormContainer,
  SwitchElement,
  TextFieldElement,
  useForm,
  useWatch,
} from 'react-hook-form-mui';
import { useTranslation } from 'react-i18next';

import { EditableCourseSectionDocument, useCreateLessonMutation } from '@/generated/graphql';
import { Button, Typography } from '@/ui/components';
import { ToasterContext } from '@/ui/context';

const LessonCreationForm = ({
  courseId,
  sectionId,
  handleCloseModalCallback,
}: {
  courseId: string;
  sectionId: string;
  handleCloseModalCallback: () => void;
}) => {
  const { t } = useTranslation();
  const { setToasterVisibility } = useContext(ToasterContext);

  const [createLesson] = useCreateLessonMutation();

  const { handleSubmit, control } = useForm();
  const [denomination, duration] = useWatch({
    name: ['denomination', 'duration'],
    control,
  });

  const onSubmit = async (values: FieldValues) => {
    if (!values.denomination || !values.duration) {
      setToasterVisibility({
        newDuration: 5000,
        newText: t('form.fillRequiredFields'),
        newType: 'error',
      });

      return;
    }

    await createLesson({
      variables: {
        lessonInfo: {
          courseId,
          sectionId,
          denomination: values.denomination,
          is_published: values.isPublished ?? false,
          duration: values.duration,
        },
      },
      onCompleted(data) {
        if (data.createLesson?.success) {
          setToasterVisibility({
            newDuration: 5000,
            newText: t('sectionItem.lessonCreated'),
            newType: 'success',
          });

          handleCloseModalCallback();
        }
      },
      refetchQueries: [
        {
          query: EditableCourseSectionDocument,
          variables: { id: courseId },
        },
      ],
    });
  };

  return (
    // @ts-expect-error FIXME: Check why the onSuccess prop is throwing type error
    <FormContainer onSuccess={handleSubmit(onSubmit)}>
      <Typography sx={{ my: 2 }} component="h3" variant="h5">
        {t('sectionItem.lessonForm')}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextFieldElement
          name="denomination"
          label={t('sectionItem.lessonName')}
          control={control}
          required
          fullWidth
        />
        <TextFieldElement
          name="duration"
          label={t('sectionItem.lessonDuration')}
          type="number"
          control={control}
          required
          fullWidth
        />
        <FormControlLabel
          control={
            <SwitchElement
              name="isPublished"
              control={control}
              label={t('sectionItem.publishLesson')}
            />
          }
          label=""
          sx={{ ml: 2 }}
        />
      </Box>
      <DialogActions sx={{ padding: '8px 0 !important', mt: 1 }}>
        <Button onClick={handleCloseModalCallback} variant="outlined" fullWidth>
          {t('common.cancel')}
        </Button>
        <Button type="submit" disabled={!denomination || !duration} fullWidth>
          {t('common.confirm')}
        </Button>
      </DialogActions>
    </FormContainer>
  );
};

export default LessonCreationForm;
