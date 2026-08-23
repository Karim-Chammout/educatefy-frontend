import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutlined';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useEffect, useRef } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { Control, useFieldArray, useWatch, TextFieldElement } from 'react-hook-form-mui';
import { useTranslation } from 'react-i18next';

import { QuizQuestionDifficulty, QuizQuestionType } from '@/generated/graphql';
import { Button, Typography as Typo } from '@/ui/components';

import { QuizFormValues } from './types';
import { questionTypeOptions, difficultyOptions } from './constants';
import { QuestionMediaField } from './MediaFields';
import AnswerRow from './AnswerRow';

const TRUE_FALSE_ANSWERS = [
  { denomination: 'True', isCorrect: false },
  { denomination: 'False', isCorrect: false },
];

type QuestionFormContentProps = {
  control: Control<QuizFormValues>;
  setValue: UseFormSetValue<QuizFormValues>;
  questionIndex: number;
  validationErrors: Record<string, boolean>;
  onClearError: (key: string) => void;
};

const QuestionFormContent = ({
  control,
  setValue,
  questionIndex,
  validationErrors,
  onClearError,
}: QuestionFormContentProps) => {
  const { t } = useTranslation();

  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

  const watchedQuestion = useWatch({ control, name: `questions.${questionIndex}` });

  const {
    fields: answers,
    append: appendAnswer,
    remove: removeAnswer,
    move: moveAnswer,
    replace: replaceAnswers,
  } = useFieldArray({
    control,
    name: `questions.${questionIndex}.answers`,
  });

  const isTrueFalse = watchedQuestion?.questionType === QuizQuestionType.TrueFalse;
  const prevTypeRef = useRef<QuizQuestionType | null>(null);

  useEffect(() => {
    const prevType = prevTypeRef.current;
    const currentType = watchedQuestion?.questionType;

    if (prevType !== currentType) {
      prevTypeRef.current = currentType;

      if (currentType === QuizQuestionType.TrueFalse && answers.length !== 2) {
        replaceAnswers(TRUE_FALSE_ANSWERS);
      }
    }
  }, [watchedQuestion?.questionType]);

  const handleAnswerDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = answers.findIndex((answer) => answer.id === active.id);
    const newIndex = answers.findIndex((answer) => answer.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      moveAnswer(oldIndex, newIndex);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, py: 1 }}>
      <Box>
        <TextFieldElement
          name={`questions.${questionIndex}.prompt`}
          label={t('quiz.prompt')}
          control={control}
          required
          fullWidth
          multiline
          minRows={2}
          error={validationErrors.prompt}
        />
        {validationErrors.prompt && (
          <FormHelperText error>{t('quiz.validation.promptRequired')}</FormHelperText>
        )}
      </Box>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Box sx={{ minWidth: 200, flex: 1 }}>
          <InputLabel>{t('quiz.questionType.label')}</InputLabel>
          <Select
            value={watchedQuestion?.questionType}
            onChange={(e) => {
              setValue(
                `questions.${questionIndex}.questionType`,
                e.target.value as QuizQuestionType,
              );
              onClearError('questionType');
            }}
            fullWidth
          >
            {questionTypeOptions.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {t(option.label)}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box sx={{ minWidth: 160, flex: 1 }}>
          <InputLabel>{t('quiz.difficulty.label')}</InputLabel>
          <Select
            value={watchedQuestion?.difficulty}
            onChange={(e) => {
              setValue(
                `questions.${questionIndex}.difficulty`,
                e.target.value as QuizQuestionDifficulty,
              );
              onClearError('questionType');
            }}
            fullWidth
          >
            {difficultyOptions.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {t(option.label)}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box sx={{ minWidth: 120 }}>
          <InputLabel required>{t('quiz.points')}</InputLabel>
          <TextFieldElement
            name={`questions.${questionIndex}.points`}
            type="number"
            control={control}
            fullWidth
            error={validationErrors.points}
          />
          {validationErrors.points && (
            <FormHelperText error>{t('quiz.validation.pointsRequired')}</FormHelperText>
          )}
        </Box>
      </Box>

      <QuestionMediaField questionIndex={questionIndex} control={control} setValue={setValue} />

      <TextFieldElement
        name={`questions.${questionIndex}.hint`}
        label={t('quiz.hint')}
        control={control}
        fullWidth
        multiline
        minRows={2}
      />
      <TextFieldElement
        name={`questions.${questionIndex}.learningObjective`}
        label={t('quiz.learningObjective')}
        control={control}
        fullWidth
        helperText={t('quiz.learningObjectiveHelper')}
      />

      <Divider />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typo variant="subtitle2">{t('quiz.questionFeedback')}</Typo>
        <TextFieldElement
          name={`questions.${questionIndex}.feedbackCorrect`}
          label={t('quiz.feedbackCorrect')}
          control={control}
          fullWidth
          multiline
          minRows={2}
        />
        <TextFieldElement
          name={`questions.${questionIndex}.feedbackIncorrect`}
          label={t('quiz.feedbackIncorrect')}
          control={control}
          fullWidth
          multiline
          minRows={2}
        />
      </Box>

      <Divider />

      <Box>
        <Typo variant="subtitle2">{t('quiz.answers')}</Typo>
        {validationErrors.answers && (
          <FormHelperText error>{t('quiz.validation.correctAnswerRequired')}</FormHelperText>
        )}
      </Box>

      {answers.length === 0 && (
        <Typo variant="body2" color="text.secondary">
          {t('quiz.noAnswersYet')}
        </Typo>
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleAnswerDragEnd}
      >
        <SortableContext
          items={answers.map((answer) => answer.id)}
          strategy={verticalListSortingStrategy}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {answers.map((answer, answerIndex) => (
              <AnswerRow
                key={answer.id}
                questionIndex={questionIndex}
                answerIndex={answerIndex}
                answerId={answer.id}
                control={control}
                setValue={setValue}
                onRemove={() => removeAnswer(answerIndex)}
                hideRemove={isTrueFalse}
              />
            ))}
          </Box>
        </SortableContext>
      </DndContext>

      {!isTrueFalse && (
        <Box>
          <Button
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => appendAnswer({ denomination: '', isCorrect: false })}
            variant="outlined"
            size="small"
          >
            {t('quiz.addAnswer')}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default QuestionFormContent;
