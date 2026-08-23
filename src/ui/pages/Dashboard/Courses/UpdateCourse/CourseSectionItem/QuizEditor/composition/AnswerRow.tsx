import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutlined';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { UseFormSetValue } from 'react-hook-form';
import { Control, TextFieldElement, CheckboxElement } from 'react-hook-form-mui';
import { useTranslation } from 'react-i18next';

import { useDND } from '@/hooks';

import { QuizFormValues } from './types';
import { AnswerImageField } from './MediaFields';

type AnswerRowProps = {
  questionIndex: number;
  answerIndex: number;
  answerId: string;
  control: Control<QuizFormValues>;
  setValue: UseFormSetValue<QuizFormValues>;
  onRemove: () => void;
  hideRemove?: boolean;
};

const AnswerRow = ({
  questionIndex,
  answerIndex,
  answerId,
  control,
  setValue,
  onRemove,
  hideRemove = false,
}: AnswerRowProps) => {
  const { t } = useTranslation();
  const { setNodeRef, style, attributes, listeners } = useDND({ itemId: answerId });

  return (
    <Box
      ref={setNodeRef}
      sx={{
        ...style,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        flexWrap: 'wrap',
        borderRadius: 1,
      }}
    >
      <Tooltip title={t('quiz.dragToReorder')}>
        <IconButton sx={{ cursor: 'move' }} size="small" {...attributes} {...listeners}>
          <DragIndicatorIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Box sx={{ flexGrow: 1, minWidth: 200 }}>
        <TextFieldElement
          name={`questions.${questionIndex}.answers.${answerIndex}.denomination`}
          label={`${t('quiz.answer')} ${answerIndex + 1}`}
          control={control}
          required
          fullWidth
        />
      </Box>
      <CheckboxElement
        name={`questions.${questionIndex}.answers.${answerIndex}.isCorrect`}
        label={t('quiz.correctAnswer')}
        control={control}
      />
      <AnswerImageField
        questionIndex={questionIndex}
        answerIndex={answerIndex}
        control={control}
        setValue={setValue}
      />
      {!hideRemove && (
        <IconButton
          color="error"
          size="small"
          onClick={onRemove}
          aria-label={t('quiz.removeAnswer')}
        >
          <RemoveCircleOutlineIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default AnswerRow;
