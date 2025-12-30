import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { FormContainer } from 'react-hook-form-mui';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { SubjectFragment } from '@/generated/graphql';
import { Button, Typography } from '@/ui/components';

import { CreateProgramForm } from './composition';
import { useCreateProgramForm } from './hooks/useCreateProgramForm';

const CreateProgram = ({ subjectsList }: { subjectsList: SubjectFragment[] }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { control, handleSubmit, formState, onSubmit, ...formHandlers } = useCreateProgramForm();

  return (
    <Container maxWidth="lg" sx={{ py: 4, pb: 10 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          {t('programs.createNewProgram')}
        </Typography>
        <Button variant="outlined" onClick={() => navigate('/dashboard/programs')}>
          {t('common.cancel')}
        </Button>
      </Box>

      {/* @ts-expect-error FIXME: Check why the onSuccess prop is throwing type error */}
      <FormContainer onSuccess={handleSubmit(onSubmit)}>
        <CreateProgramForm
          control={control}
          formState={formState}
          formHandlers={formHandlers}
          subjectsList={subjectsList}
        />
      </FormContainer>
    </Container>
  );
};

export default CreateProgram;
