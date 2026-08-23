import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import { Control, useWatch } from 'react-hook-form-mui';
import { useTranslation } from 'react-i18next';

import { useDND } from '@/hooks';
import { Typography as Typo } from '@/ui/components';

import { QuizFormValues } from './types';
import { questionTypeOptions, questionTypeColors, difficultyColors } from './constants';

type QuestionListItemProps = {
  control: Control<QuizFormValues>;
  questionIndex: number;
  questionId: string;
  onEdit: () => void;
  onRemove: () => void;
};

const QuestionListItem = ({
  control,
  questionIndex,
  questionId,
  onEdit,
  onRemove,
}: QuestionListItemProps) => {
  const { t } = useTranslation();
  const { setNodeRef, style, attributes, listeners, isDragging } = useDND({ itemId: questionId });

  const prompt = useWatch({ control, name: `questions.${questionIndex}.prompt` });
  const questionType = useWatch({ control, name: `questions.${questionIndex}.questionType` });
  const points = useWatch({ control, name: `questions.${questionIndex}.points` });
  const difficulty = useWatch({ control, name: `questions.${questionIndex}.difficulty` });

  const truncatedPrompt =
    prompt && prompt.trim().length > 0
      ? prompt.trim().length > 80
        ? `${prompt.trim().slice(0, 80)}…`
        : prompt.trim()
      : t('quiz.noPrompt');

  return (
    <Paper
      ref={setNodeRef}
      variant="outlined"
      sx={{
        p: 1.5,
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        transform: style.transform,
        transition: style.transition,
        opacity: isDragging ? 0.4 : 1,
        cursor: 'default',
        borderLeftWidth: difficulty ? 3 : 1,
        borderLeftColor: difficulty ? (difficultyColors[difficulty] ?? 'divider') : undefined,
        '&:hover': { borderColor: 'primary.main' },
      }}
    >
      <Tooltip title={t('quiz.dragToReorder')}>
        <IconButton
          sx={{ cursor: 'move', flexShrink: 0 }}
          size="small"
          {...attributes}
          {...listeners}
        >
          <DragIndicatorIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Box
        sx={{
          minWidth: 32,
          height: 32,
          borderRadius: '50%',
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          fontSize: '0.875rem',
          flexShrink: 0,
        }}
      >
        {questionIndex + 1}
      </Box>

      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Typo
          variant="body2"
          sx={{
            color: prompt && prompt.trim().length > 0 ? 'text.primary' : 'text.secondary',
            fontStyle: prompt && prompt.trim().length > 0 ? 'normal' : 'italic',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {truncatedPrompt}
        </Typo>
      </Box>

      <Chip
        label={t(questionTypeOptions.find((o) => o.id === questionType)?.label ?? '')}
        color={questionTypeColors[questionType] ?? 'default'}
        size="small"
        variant="outlined"
        sx={{ flexShrink: 0 }}
      />

      <Chip
        label={`${points ?? 0} ${t('quiz.points')}`}
        size="small"
        variant="outlined"
        sx={{ flexShrink: 0 }}
      />

      <Tooltip title={t('quiz.editQuestion')}>
        <IconButton size="small" color="primary" onClick={onEdit}>
          <EditOutlinedIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Tooltip title={t('quiz.removeQuestion')}>
        <IconButton
          size="small"
          color="error"
          onClick={onRemove}
          aria-label={t('quiz.removeQuestion')}
        >
          <DeleteOutlineIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Paper>
  );
};

export default QuestionListItem;
