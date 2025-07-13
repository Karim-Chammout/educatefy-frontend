import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { FormContainer } from 'react-hook-form-mui';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { LanguageFragment, SubjectFragment } from '@/generated/graphql';
import { Button, Typography } from '@/ui/components';

import { CreateCourseFormSections } from './composition';
import { useCreateCourseForm } from './hooks/useCreateCourseForm';

const CreateCourse = ({
  languages,
  subjectsList,
}: {
  languages: LanguageFragment[];
  subjectsList: SubjectFragment[];
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { control, handleSubmit, formState, onSubmit, ...formHandlers } = useCreateCourseForm();

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
          {t('courses.createNewCourse')}
        </Typography>
        <Button variant="outlined" onClick={() => navigate('/dashboard/courses')}>
          {t('common.cancel')}
        </Button>
      </Box>

      {/* @ts-expect-error FIXME: Check why the onSuccess prop is throwing type error */}
      <FormContainer onSuccess={handleSubmit(onSubmit)}>
        <CreateCourseFormSections
          control={control}
          formState={formState}
          formHandlers={formHandlers}
          languages={languages}
          subjectsList={subjectsList}
        />
      </FormContainer>
    </Container>
  );
};

export default CreateCourse;
