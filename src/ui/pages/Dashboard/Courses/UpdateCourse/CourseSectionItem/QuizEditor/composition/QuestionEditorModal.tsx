import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import { useCallback, useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { Control, useWatch } from 'react-hook-form-mui';
import { useTranslation } from 'react-i18next';

import { Button, Modal } from '@/ui/components';

import { QuizFormValues } from './types';
import QuestionFormContent from './QuestionFormContent';

type QuestionEditorModalProps = {
  open: boolean;
  questionIndex: number;
  onClose: () => void;
  control: Control<QuizFormValues>;
  setValue: UseFormSetValue<QuizFormValues>;
};

const QuestionEditorModal = ({
  open,
  questionIndex,
  onClose,
  control,
  setValue,
}: QuestionEditorModalProps) => {
  const { t } = useTranslation();

  const watchedQuestion = useWatch({ control, name: `questions.${questionIndex}` });

  const [validationErrors, setValidationErrors] = useState<Record<string, boolean>>({});

  const handleClearError = (key: string) => {
    if (validationErrors[key]) setValidationErrors((prev) => ({ ...prev, [key]: false }));
  };

  const handleClose = useCallback(() => {
    setValidationErrors({});
    onClose();
  }, [onClose]);

  const handleSave = () => {
    const prompt = watchedQuestion?.prompt?.trim();
    const points = watchedQuestion?.points;
    const hasCorrectAnswer = watchedQuestion?.answers?.some(
      (answer) => answer?.denomination?.trim() && answer?.isCorrect,
    );

    const errors: Record<string, boolean> = {};

    if (!prompt) errors.prompt = true;
    if (!points || points < 1) errors.points = true;
    if (!hasCorrectAnswer) errors.answers = true;

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);

      return;
    }

    setValidationErrors({});
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={`${t('quiz.editQuestion')} — ${t('quiz.question')} ${questionIndex + 1}`}
      maxWidth="md"
    >
      <QuestionFormContent
        control={control}
        setValue={setValue}
        questionIndex={questionIndex}
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
          {t('common.saveChanges')}
        </Button>
      </Box>
    </Modal>
  );
};

export default QuestionEditorModal;
