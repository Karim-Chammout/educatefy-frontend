import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { QuizQuestionDifficulty, QuizQuestionType } from '@/generated/graphql';
import { Button, Modal } from '@/ui/components';

import { QuizFormValues, QuizQuestionFormValue } from './types';
import QuestionFormContent from './QuestionFormContent';

type QuestionFormModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (question: QuizQuestionFormValue) => void;
};

const DEFAULT_FORM_VALUES: QuizFormValues = {
  denomination: '',
  isPublished: false,
  passingScore: 80,
  maxAttempts: 0,
  shuffleQuestions: false,
  shuffleAnswers: false,
  navigationMode: 'Free' as QuizFormValues['navigationMode'],
  questionsPerPage: 0,
  showCorrectAnswers: false,
  timeLimitMinutes: null,
  feedbackPassed: '',
  feedbackFailed: '',
  questions: [
    {
      prompt: '',
      questionType: QuizQuestionType.SingleChoice,
      points: 1,
      difficulty: QuizQuestionDifficulty.Easy,
      hint: '',
      learningObjective: '',
      feedbackCorrect: '',
      feedbackIncorrect: '',
      mediaUrl: null,
      mediaType: null,
      answers: [
        { denomination: '', isCorrect: true },
        { denomination: '', isCorrect: false },
      ],
    },
  ],
};

const QuestionFormModal = ({ open, onClose, onSave }: QuestionFormModalProps) => {
  const { t } = useTranslation();

  const [validationErrors, setValidationErrors] = useState<Record<string, boolean>>({});

  const formMethods = useForm<QuizFormValues>({
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const { reset } = formMethods;

  const handleClearError = (key: string) => {
    if (validationErrors[key]) setValidationErrors((prev) => ({ ...prev, [key]: false }));
  };

  const handleClose = useCallback(() => {
    setValidationErrors({});
    reset(DEFAULT_FORM_VALUES);
    onClose();
  }, [onClose, reset]);

  const handleSave = () => {
    const q = formMethods.getValues('questions.0');

    const errors: Record<string, boolean> = {};

    if (!q.prompt.trim()) errors.prompt = true;
    if (q.points < 1) errors.points = true;
    if (!q.answers.some((a) => a.denomination.trim() && a.isCorrect)) errors.answers = true;

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);

      return;
    }

    setValidationErrors({});
    reset(DEFAULT_FORM_VALUES);
    onSave({
      prompt: q.prompt.trim(),
      questionType: q.questionType,
      points: q.points,
      difficulty: q.difficulty || QuizQuestionDifficulty.Easy,
      hint: q.hint?.trim() || null,
      learningObjective: q.learningObjective?.trim() || null,
      feedbackCorrect: q.feedbackCorrect?.trim() || null,
      feedbackIncorrect: q.feedbackIncorrect?.trim() || null,
      mediaUrl: q.mediaUrl,
      mediaType: q.mediaType,
      answers: q.answers,
    });
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} title={t('quiz.addQuestion')} maxWidth="md">
      <QuestionFormContent
        control={formMethods.control}
        setValue={formMethods.setValue}
        questionIndex={0}
        validationErrors={validationErrors}
        onClearError={handleClearError}
      />

      <Box
        sx={{
          position: 'sticky',
          bottom: 0,
          bgcolor: 'background.paper',
          borderTop: 1,
          borderColor: 'divider',
          mx: -3,
          px: 3,
          py: 2,
          mt: 2,
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 2,
        }}
      >
        <Button variant="outlined" startIcon={<CancelIcon />} onClick={handleClose}>
          {t('common.cancel')}
        </Button>
        <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave}>
          {t('common.create')}
        </Button>
      </Box>
    </Modal>
  );
};

export default QuestionFormModal;
