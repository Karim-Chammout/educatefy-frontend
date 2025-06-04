import Box from '@mui/material/Box';
import DialogActions from '@mui/material/DialogActions';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Dispatch, SetStateAction, useContext } from 'react';
import {
  FieldValues,
  FormContainer,
  SwitchElement,
  TextFieldElement,
  useForm,
  useWatch,
} from 'react-hook-form-mui';
import { useTranslation } from 'react-i18next';

import {
  SectionFragment,
  useEditableCourseSectionLazyQuery,
  useUpdateLessonMutation,
} from '@/generated/graphql';
import { Button } from '@/ui/components';
import { ToasterContext } from '@/ui/context';

type SectionItemType = SectionFragment['items'][0];

const LessonEditForm = ({
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
  const { t } = useTranslation();
  const { setToasterVisibility } = useContext(ToasterContext);

  const [updateLesson, { loading }] = useUpdateLessonMutation();
  const [updatedCourseSection, { loading: isLoadingNewCourseSection }] =
    useEditableCourseSectionLazyQuery();

  const { handleSubmit, control } = useForm({
    defaultValues: {
      denomination: item.denomination,
      duration: item.duration,
      isPublished: item.is_published ?? false,
    },
  });

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

    await updateLesson({
      variables: {
        lessonInfo: {
          id: item.id,
          denomination: values.denomination,
          is_published: values.isPublished ?? false,
          duration: values.duration,
        },
      },
      onCompleted: async (data) => {
        if (data.updateLesson?.success) {
          setToasterVisibility({
            newDuration: 5000,
            newText: t('sectionItem.lessonUpdated'),
            newType: 'success',
          });

          const refetchResult = await updatedCourseSection({
            variables: { id: courseId },
            fetchPolicy: 'network-only',
          });

          const updatedSection = refetchResult.data?.editableCourse?.sections.find(
            (section) => section.id === sectionId,
          );

          if (updatedSection) {
            setSectionItems(updatedSection.items);
          }

          handleCloseModalCallback();
        }
      },
    });
  };

  return (
    // @ts-expect-error FIXME: Check why the onSuccess prop is throwing type error
    <FormContainer onSuccess={handleSubmit(onSubmit)}>
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
        <Button
          type="submit"
          disabled={!denomination || !duration || loading || isLoadingNewCourseSection}
          fullWidth
        >
          {t('common.confirm')}
        </Button>
      </DialogActions>
    </FormContainer>
  );
};

export default LessonEditForm;
