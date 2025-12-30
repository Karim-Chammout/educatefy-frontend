import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import { Control, SwitchElement } from 'react-hook-form-mui';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { SubjectFragment } from '@/generated/graphql';
import { Button } from '@/ui/components';

import BasicInfoSection from './BasicInfoSection';
import LearningOutcomesSection from './LearningOutcomesSection';
import ProgramImageSection from './ProgramImageSection';
import { RequirementsSection } from './RequirementsSection';
import { FormHandlers, FormState } from './types';
import { canSubmitForm } from './validation';

type CreateProgramFormType = {
  control: Control<any>;
  formState: FormState;
  formHandlers: FormHandlers;
  subjectsList: SubjectFragment[];
};

const CreateProgramForm = ({
  control,
  formState,
  formHandlers,
  subjectsList,
}: CreateProgramFormType) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <BasicInfoSection
        control={control}
        formState={formState}
        formHandlers={formHandlers}
        subjectsList={subjectsList}
      />

      <ProgramImageSection formState={formState} formHandlers={formHandlers} />

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
        <Button variant="outlined" color="primary" onClick={() => navigate('/dashboard/programs')}>
          {t('common.cancel')}
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!canSubmitForm(formState)}
        >
          {t('program.createProgramBtn')}
        </Button>
      </Box>
    </Box>
  );
};

export default CreateProgramForm;
