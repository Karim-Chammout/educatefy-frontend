import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Container from '@mui/material/Container';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { EditableQuizFragment } from '@/generated/graphql';
import { Button, Typography } from '@/ui/components';

import { StyledLink } from '../../CourseSections/CourseSections.style';
import { QuizBuilderForm } from './composition';

type QuizEditorProps = {
  mode: 'create' | 'edit';
  courseId: string;
  sectionId: string;
  sectionDenomination: string;
  quizName: string;
  quizItemId?: string;
  quizItem?: EditableQuizFragment;
};

const QuizEditor = ({
  mode,
  courseId,
  sectionId,
  sectionDenomination,
  quizName,
  quizItemId,
  quizItem,
}: QuizEditorProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const sectionUrl = `/dashboard/courses/update/${courseId}/sections/${sectionId}`;

  return (
    <Container maxWidth="lg" sx={{ py: 4, pb: 10 }}>
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Typography variant="h4" component="h1">
            {mode === 'create' ? t('quiz.quizForm') : t('quiz.quizEditForm')}
          </Typography>
          <Button variant="outlined" onClick={() => navigate(sectionUrl)}>
            {t('common.cancel')}
          </Button>
        </Box>

        <Box component="nav" aria-label="breadcrumb">
          <Breadcrumbs separator="/">
            <StyledLink to={`/dashboard/courses/update/${courseId}`}>
              {t('courseSection.backToCourse')}
            </StyledLink>
            <StyledLink to={`/dashboard/courses/update/${courseId}/sections`}>
              {t('courseSection.sections')}
            </StyledLink>
            <StyledLink to={sectionUrl}>{sectionDenomination}</StyledLink>
            <StyledLink
              to={mode === 'edit' && quizItemId ? `${sectionUrl}/item/${quizItemId}` : sectionUrl}
              isCurrent
            >
              {quizName}
            </StyledLink>
          </Breadcrumbs>
        </Box>
      </Box>

      <QuizBuilderForm mode={mode} courseId={courseId} sectionId={sectionId} item={quizItem} />
    </Container>
  );
};

export default QuizEditor;
