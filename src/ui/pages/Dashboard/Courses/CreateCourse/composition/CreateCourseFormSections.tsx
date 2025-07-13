import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import { Control, SwitchElement } from 'react-hook-form-mui';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { LanguageFragment, SubjectFragment } from '@/generated/graphql';
import { Button } from '@/ui/components';

import { BasicInfoSection } from './BasicInfoSection';
import { CourseImageSection } from './CourseImageSection';
import { LearningOutcomesSection } from './LearningOutcomesSection';
import { RequirementsSection } from './RequirementsSection';
import { FormHandlers, FormState } from './types';
import { canSubmitForm } from './validation';

type CreateCourseFormSectionsType = {
  control: Control<any>;
  formState: FormState;
  formHandlers: FormHandlers;
  languages: LanguageFragment[];
  subjectsList: SubjectFragment[];
};

export const CreateCourseFormSections = ({
  control,
  formState,
  formHandlers,
  languages,
  subjectsList,
}: CreateCourseFormSectionsType) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <BasicInfoSection
        control={control}
        formState={formState}
        formHandlers={formHandlers}
        languages={languages}
        subjectsList={subjectsList}
      />

      <CourseImageSection formState={formState} formHandlers={formHandlers} />

      <LearningOutcomesSection formState={formState} formHandlers={formHandlers} />

      <RequirementsSection formState={formState} formHandlers={formHandlers} />

      <Paper elevation={0} variant="outlined" sx={{ p: 3 }}>
        <FormControlLabel
          control={
            <SwitchElement name="isPublished" control={control} label={t('common.isPublished')} />
          }
          label=""
          sx={{ ml: 1 }}
        />
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <Button variant="outlined" color="primary" onClick={() => navigate('/dashboard/courses')}>
          {t('common.cancel')}
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!canSubmitForm(formState)}
        >
          {t('course.createCourseBtn')}
        </Button>
      </Box>
    </Box>
  );
};
