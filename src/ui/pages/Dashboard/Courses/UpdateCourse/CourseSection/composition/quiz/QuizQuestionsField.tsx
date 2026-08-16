import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutlined';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import ImageIcon from '@mui/icons-material/Image';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutlined';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
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
import { useContext, useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import {
  Control,
  useFieldArray,
  useWatch,
  CheckboxElement,
  SelectElement,
  TextFieldElement,
} from 'react-hook-form-mui';
import { useTranslation } from 'react-i18next';

import api from '@/api';
import { useDND } from '@/hooks';
import {
  QuizQuestionDifficulty,
  QuizQuestionMediaType,
  QuizQuestionType,
} from '@/generated/graphql';
import { Button, Typography } from '@/ui/components';
import FileDropzone from '@/ui/compositions/FileDropzone';
import { ToasterContext } from '@/ui/context';
import { FileResponseType } from '@/types/types';
import { getMediaUrl } from '@/utils/getMediaUrl';

import { QuizFormValues } from './types';

const questionTypeOptions = [
  { id: QuizQuestionType.SingleChoice, label: 'quiz.questionType.singleChoice' },
  { id: QuizQuestionType.MultiSelect, label: 'quiz.questionType.multiSelect' },
  { id: QuizQuestionType.TrueFalse, label: 'quiz.questionType.trueFalse' },
];

const difficultyOptions = [
  { id: QuizQuestionDifficulty.Easy, label: 'quiz.difficulty.easy' },
  { id: QuizQuestionDifficulty.Medium, label: 'quiz.difficulty.medium' },
  { id: QuizQuestionDifficulty.Hard, label: 'quiz.difficulty.hard' },
];

const mediaAccept = {
  'image/png': ['.png'],
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/webp': ['.webp'],
  'image/gif': ['.gif'],
  'image/svg+xml': ['.svg'],
  'video/mp4': ['.mp4'],
  'video/webm': ['.webm'],
  'video/ogg': ['.ogv'],
};

const QuestionMediaField = ({
  questionIndex,
  control,
  setValue,
}: {
  questionIndex: number;
  control: Control<QuizFormValues>;
  setValue: UseFormSetValue<QuizFormValues>;
}) => {
  const { t } = useTranslation();
  const { setToasterVisibility } = useContext(ToasterContext);
  const [isUploading, setIsUploading] = useState(false);

  const mediaUrl = useWatch({ control, name: `questions.${questionIndex}.mediaUrl` });
  const mediaType = useWatch({ control, name: `questions.${questionIndex}.mediaType` });

  const handleUpload = async (files: File[]) => {
    if (files.length === 0) return;

    const file = files[0];

    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('destinationFolder', 'quiz-media');

      const uploaded = await api.post<FileResponseType>('/api/file/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (uploaded.success) {
        setValue(`questions.${questionIndex}.mediaUrl`, uploaded.filePath);
        setValue(
          `questions.${questionIndex}.mediaType`,
          file.type.startsWith('video/')
            ? QuizQuestionMediaType.Video
            : QuizQuestionMediaType.Image,
        );
      }
    } catch (_error) {
      setToasterVisibility({
        newDuration: 5000,
        newText: t('error.message'),
        newType: 'error',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setValue(`questions.${questionIndex}.mediaUrl`, null);
    setValue(`questions.${questionIndex}.mediaType`, null);
  };

  return (
    <Box>
      <Typography variant="subtitle2">{t('quiz.questionMedia.label')}</Typography>
      {mediaUrl ? (
        <Box sx={{ position: 'relative', maxWidth: 320, mt: 1 }}>
          {mediaType === QuizQuestionMediaType.Video ? (
            <Box
              component="video"
              src={getMediaUrl(mediaUrl)}
              controls
              sx={{ width: '100%', borderRadius: 1 }}
            />
          ) : (
            <Box
              component="img"
              src={getMediaUrl(mediaUrl)}
              sx={{ width: '100%', borderRadius: 1 }}
            />
          )}
          <IconButton
            onClick={handleRemove}
            size="small"
            aria-label={t('quiz.questionMedia.remove')}
            sx={{
              position: 'absolute',
              top: -10,
              right: -10,
              bgcolor: 'background.paper',
              boxShadow: 1,
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      ) : (
        <Box sx={{ mt: 1 }}>
          <FileDropzone
            onFilesSelected={handleUpload}
            isUploading={isUploading}
            accept={mediaAccept}
          />
        </Box>
      )}
    </Box>
  );
};

const AnswerImageField = ({
  questionIndex,
  answerIndex,
  control,
  setValue,
}: {
  questionIndex: number;
  answerIndex: number;
  control: Control<QuizFormValues>;
  setValue: UseFormSetValue<QuizFormValues>;
}) => {
  const { t } = useTranslation();
  const { setToasterVisibility } = useContext(ToasterContext);
  const [isUploading, setIsUploading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const imageUrl = useWatch({
    control,
    name: `questions.${questionIndex}.answers.${answerIndex}.imageUrl`,
  });

  const handleUpload = async (files: File[]) => {
    if (files.length === 0) return;

    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append('file', files[0]);
      formData.append('destinationFolder', 'quiz-media');

      const uploaded = await api.post<FileResponseType>('/api/file/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (uploaded.success) {
        setValue(`questions.${questionIndex}.answers.${answerIndex}.imageUrl`, uploaded.filePath);
        setIsExpanded(false);
      }
    } catch (_error) {
      setToasterVisibility({
        newDuration: 5000,
        newText: t('error.message'),
        newType: 'error',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setValue(`questions.${questionIndex}.answers.${answerIndex}.imageUrl`, null);
  };

  return (
    <>
      <Tooltip title={imageUrl ? t('quiz.answerImage.remove') : t('quiz.answerImage.add')}>
        <IconButton
          size="small"
          onClick={() => (imageUrl ? handleRemove() : setIsExpanded((value) => !value))}
        >
          {imageUrl ? <ImageIcon color="primary" /> : <AddPhotoAlternateIcon />}
        </IconButton>
      </Tooltip>
      {imageUrl ? (
        <Box sx={{ mt: 1, maxWidth: 200 }}>
          <Box
            component="img"
            src={getMediaUrl(imageUrl)}
            sx={{ width: '100%', borderRadius: 1 }}
          />
        </Box>
      ) : isExpanded ? (
        <Box sx={{ mt: 1, maxWidth: 320 }}>
          <FileDropzone
            onFilesSelected={handleUpload}
            isUploading={isUploading}
            accept={{
              'image/png': ['.png'],
              'image/jpeg': ['.jpg', '.jpeg'],
              'image/webp': ['.webp'],
              'image/gif': ['.gif'],
              'image/svg+xml': ['.svg'],
            }}
          />
        </Box>
      ) : null}
    </>
  );
};

type AnswerRowProps = {
  questionIndex: number;
  answerIndex: number;
  answerId: string;
  control: Control<QuizFormValues>;
  setValue: UseFormSetValue<QuizFormValues>;
  onRemove: () => void;
};

const AnswerRow = ({
  questionIndex,
  answerIndex,
  answerId,
  control,
  setValue,
  onRemove,
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
      <IconButton color="error" size="small" onClick={onRemove} aria-label={t('quiz.removeAnswer')}>
        <RemoveCircleOutlineIcon />
      </IconButton>
    </Box>
  );
};

type QuestionCardProps = {
  control: Control<QuizFormValues>;
  setValue: UseFormSetValue<QuizFormValues>;
  questionIndex: number;
  questionId: string;
  watchedQuestion?: QuizFormValues['questions'][number];
  onRemove: () => void;
};

const QuestionCard = ({
  control,
  setValue,
  questionIndex,
  questionId,
  watchedQuestion,
  onRemove,
}: QuestionCardProps) => {
  const { t } = useTranslation();
  const { setNodeRef, style, attributes, listeners, isDragging } = useDND({ itemId: questionId });

  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

  const {
    fields: answers,
    append: appendAnswer,
    remove: removeAnswer,
    move: moveAnswer,
  } = useFieldArray({
    control,
    name: `questions.${questionIndex}.answers`,
  });

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
    <Paper
      ref={setNodeRef}
      variant="outlined"
      sx={{
        p: 2,
        transform: style.transform,
        transition: style.transition,
        opacity: isDragging ? 0.4 : 1,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title={t('quiz.dragToReorder')}>
            <IconButton sx={{ cursor: 'move' }} size="small" {...attributes} {...listeners}>
              <DragIndicatorIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            {t('quiz.question')} {questionIndex + 1}
          </Typography>
        </Box>
        <IconButton
          color="error"
          size="small"
          onClick={onRemove}
          aria-label={t('quiz.removeQuestion')}
        >
          <RemoveCircleOutlineIcon />
        </IconButton>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
        <TextFieldElement
          name={`questions.${questionIndex}.prompt`}
          label={t('quiz.prompt')}
          control={control}
          required
          fullWidth
          multiline
          minRows={2}
        />

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Box sx={{ minWidth: 200, flex: 1 }}>
            <SelectElement
              name={`questions.${questionIndex}.questionType`}
              label={t('quiz.questionType.label')}
              control={control}
              options={questionTypeOptions.map((option) => ({
                id: option.id,
                label: t(option.label),
              }))}
              required
              fullWidth
            />
          </Box>
          <Box sx={{ minWidth: 160, flex: 1 }}>
            <SelectElement
              name={`questions.${questionIndex}.difficulty`}
              label={t('quiz.difficulty.label')}
              control={control}
              options={difficultyOptions.map((option) => ({
                id: option.id,
                label: t(option.label),
              }))}
              fullWidth
            />
          </Box>
          <Box sx={{ minWidth: 120 }}>
            <TextFieldElement
              name={`questions.${questionIndex}.points`}
              label={t('quiz.points')}
              type="number"
              control={control}
              required
              fullWidth
            />
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
        />

        <Divider />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="subtitle2">{t('quiz.questionFeedback')}</Typography>
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

        <Typography variant="subtitle2">{t('quiz.answers')}</Typography>
        <Typography variant="caption" color="text.secondary">
          {t('quiz.dragToReorder')}
        </Typography>

        {answers.length === 0 && (
          <Typography variant="body2" color="text.secondary">
            {t('quiz.noAnswersYet')}
          </Typography>
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
                />
              ))}
            </Box>
          </SortableContext>
        </DndContext>

        <Box>
          <ButtonGroup variant="text" size="small">
            <Button
              startIcon={<AddCircleOutlineIcon />}
              onClick={() => appendAnswer({ denomination: '', isCorrect: false })}
              variant="text"
              color="inherit"
            >
              {t('quiz.addAnswer')}
            </Button>
            {watchedQuestion?.questionType === QuizQuestionType.TrueFalse && (
              <Button
                onClick={() => {
                  const hasTrue = answers.some(
                    (_, index) =>
                      (watchedQuestion?.answers?.[index]?.denomination ?? '').toLowerCase() ===
                      'true',
                  );
                  const hasFalse = answers.some(
                    (_, index) =>
                      (watchedQuestion?.answers?.[index]?.denomination ?? '').toLowerCase() ===
                      'false',
                  );

                  if (!hasTrue) appendAnswer({ denomination: 'True', isCorrect: false });
                  if (!hasFalse) appendAnswer({ denomination: 'False', isCorrect: false });
                }}
                variant="text"
                color="inherit"
              >
                {t('quiz.trueFalseAnswers')}
              </Button>
            )}
          </ButtonGroup>
        </Box>
      </Box>
    </Paper>
  );
};

const QuizQuestionsField = ({
  control,
  setValue,
}: {
  control: Control<QuizFormValues>;
  setValue: UseFormSetValue<QuizFormValues>;
}) => {
  const { t } = useTranslation();

  const {
    fields: questions,
    append: appendQuestion,
    remove: removeQuestion,
    move: moveQuestion,
  } = useFieldArray({
    control,
    name: 'questions',
  });

  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

  const watchedQuestions = useWatch({ control, name: 'questions' });

  const handleQuestionDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = questions.findIndex((question) => question.id === active.id);
    const newIndex = questions.findIndex((question) => question.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      moveQuestion(oldIndex, newIndex);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box>
        <Typography component="h4" variant="h6">
          {t('quiz.questions')}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {t('quiz.dragToReorder')}
        </Typography>
      </Box>

      {questions.length === 0 && (
        <Typography variant="body2" color="text.secondary">
          {t('quiz.noQuestionsYet')}
        </Typography>
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleQuestionDragEnd}
      >
        <SortableContext
          items={questions.map((question) => question.id)}
          strategy={verticalListSortingStrategy}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {questions.map((question, questionIndex) => {
              const watchedQuestion = watchedQuestions[questionIndex];

              return (
                <QuestionCard
                  key={question.id}
                  control={control}
                  setValue={setValue}
                  questionIndex={questionIndex}
                  questionId={question.id}
                  watchedQuestion={watchedQuestion}
                  onRemove={() => removeQuestion(questionIndex)}
                />
              );
            })}
          </Box>
        </SortableContext>
      </DndContext>

      <Button
        variant="outlined"
        startIcon={<AddCircleOutlineIcon />}
        onClick={() =>
          appendQuestion({
            prompt: '',
            questionType: QuizQuestionType.SingleChoice,
            points: 1,
            answers: [
              { denomination: '', isCorrect: true },
              { denomination: '', isCorrect: false },
            ],
          })
        }
      >
        {t('quiz.addQuestion')}
      </Button>
    </Box>
  );
};

export default QuizQuestionsField;
