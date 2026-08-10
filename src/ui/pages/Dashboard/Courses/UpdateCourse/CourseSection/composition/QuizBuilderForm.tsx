import { useLazyQuery, useMutation } from '@apollo/client/react';
import Box from '@mui/material/Box';
import DialogActions from '@mui/material/DialogActions';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { Dispatch, SetStateAction, useContext } from 'react';
import {
  useForm,
  FormContainer,
  SelectElement,
  SwitchElement,
  TextFieldElement,
  useWatch,
} from 'react-hook-form-mui';
import { useTranslation } from 'react-i18next';

import {
  CreateQuizDocument,
  EditableCourseSectionDocument,
  EditableQuizFragment,
  QuizNavigationMode,
  SectionFragment,
  UpdateQuizDocument,
} from '@/generated/graphql';
import { Button, Typography } from '@/ui/components';
import { ToasterContext } from '@/ui/context';

import QuizQuestionsField from './quiz/QuizQuestionsField';
import { QuizFormValues } from './quiz/types';

const navigationModeOptions = [
  { id: QuizNavigationMode.Free, label: 'quiz.navigationMode.free' },
  { id: QuizNavigationMode.Sequential, label: 'quiz.navigationMode.sequential' },
];

type QuizBuilderFormProps = {
  mode: 'create' | 'edit';
  courseId: string;
  sectionId: string;
  item?: EditableQuizFragment;
  setSectionItems: Dispatch<SetStateAction<SectionFragment['items']>>;
  handleCloseModalCallback: () => void;
};

const getDefaultValues = (item?: EditableQuizFragment): QuizFormValues => ({
  denomination: item?.denomination ?? '',
  isPublished: item?.is_published ?? false,
  passingScore: item?.passing_score ?? 70,
  maxAttempts: item?.max_attempts ?? 3,
  shuffleQuestions: item?.shuffle_questions ?? false,
  shuffleAnswers: item?.shuffle_answers ?? false,
  navigationMode: item?.navigation_mode ?? QuizNavigationMode.Free,
  questionsPerPage: item?.questions_per_page ?? 0,
  showCorrectAnswers: item?.show_correct_answers ?? true,
  timeLimitMinutes: item?.time_limit_minutes ?? null,
  feedbackPassed: item?.feedback_passed ?? '',
  feedbackFailed: item?.feedback_failed ?? '',
  questions:
    item?.questions.map((question) => ({
      id: question.id,
      prompt: question.prompt,
      questionType: question.question_type,
      points: question.points,
      difficulty: question.difficulty ?? null,
      hint: question.hint ?? null,
      learningObjective: question.learning_objective ?? null,
      feedbackCorrect: question.feedback_correct ?? null,
      feedbackIncorrect: question.feedback_incorrect ?? null,
      mediaUrl: question.media_url ?? null,
      mediaType: question.media_type ?? null,
      answers: question.answers.map((answer) => ({
        id: answer.id,
        denomination: answer.denomination ?? '',
        isCorrect: answer.is_correct ?? false,
        imageUrl: answer.image_url ?? null,
      })),
    })) ?? [],
});

const QuizBuilderForm = ({
  mode,
  courseId,
  sectionId,
  item,
  setSectionItems,
  handleCloseModalCallback,
}: QuizBuilderFormProps) => {
  const { t } = useTranslation();
  const { setToasterVisibility } = useContext(ToasterContext);

  const [createQuiz, { loading: isCreating }] = useMutation(CreateQuizDocument);
  const [updateQuiz, { loading: isUpdating }] = useMutation(UpdateQuizDocument);
  const [updatedCourseSection, { loading: isLoadingNewCourseSection }] = useLazyQuery(
    EditableCourseSectionDocument,
    {
      fetchPolicy: 'network-only',
    },
  );

  const { handleSubmit, control, setValue } = useForm<QuizFormValues>({
    defaultValues: getDefaultValues(item),
  });

  const navigationMode = useWatch({ control, name: 'navigationMode' });

  const buildQuestions = (values: QuizFormValues) =>
    values.questions.map((question, questionIndex) => ({
      id: mode === 'edit' ? (question.id ?? null) : undefined,
      prompt: question.prompt.trim(),
      question_type: question.questionType,
      points: Number(question.points),
      rank: questionIndex + 1,
      hint: question.hint?.trim() || null,
      difficulty: question.difficulty ?? null,
      learning_objective: question.learningObjective?.trim() || null,
      feedback_correct: question.feedbackCorrect?.trim() || null,
      feedback_incorrect: question.feedbackIncorrect?.trim() || null,
      media_url: question.mediaUrl ?? null,
      media_type: question.mediaType ?? null,
      answers: question.answers.map((answer, answerIndex) => ({
        id: mode === 'edit' ? (answer.id ?? null) : undefined,
        denomination: answer.denomination.trim(),
        image_url: answer.imageUrl ?? null,
        is_correct: answer.isCorrect,
        rank: answerIndex + 1,
      })),
    }));

  const isValid = (values: QuizFormValues) => {
    if (!values.denomination?.trim()) return false;

    if (!values.questions.length) return false;

    return values.questions.every(
      (question) =>
        question.prompt?.trim() &&
        Number(question.points) >= 1 &&
        question.answers?.length &&
        question.answers.some((answer) => answer.denomination?.trim() && answer.isCorrect),
    );
  };

  const refreshSectionItems = async () => {
    const refetchResult = await updatedCourseSection({ variables: { id: courseId } });
    const updatedSection = refetchResult.data?.editableCourse?.sections.find(
      (section) => section.id === sectionId,
    );

    if (updatedSection) {
      setSectionItems(updatedSection.items);
    }
  };

  const onSubmit = async (values: QuizFormValues) => {
    if (!isValid(values)) {
      setToasterVisibility({
        newDuration: 5000,
        newText: t('quiz.fillRequiredFields'),
        newType: 'error',
      });

      return;
    }

    const commonInfo = {
      denomination: values.denomination.trim(),
      is_published: values.isPublished,
      passing_score: Number(values.passingScore),
      max_attempts: Number(values.maxAttempts),
      shuffle_questions: values.shuffleQuestions,
      shuffle_answers: values.shuffleAnswers,
      navigation_mode: values.navigationMode,
      questions_per_page: Number(values.questionsPerPage) || 0,
      show_correct_answers: values.showCorrectAnswers,
      time_limit_minutes: values.timeLimitMinutes ? Number(values.timeLimitMinutes) : null,
      feedback_passed: values.feedbackPassed.trim() || null,
      feedback_failed: values.feedbackFailed.trim() || null,
      questions: buildQuestions(values),
    };

    if (mode === 'create') {
      await createQuiz({
        variables: {
          quizInfo: {
            ...commonInfo,
            courseId,
            sectionId,
          },
        },
        onCompleted: async (data) => {
          if (data.createQuiz?.success) {
            setToasterVisibility({
              newDuration: 5000,
              newText: t('quiz.createSuccess'),
              newType: 'success',
            });

            await refreshSectionItems();
            handleCloseModalCallback();
          } else {
            setToasterVisibility({
              newDuration: 5000,
              newText: t('quiz.createError'),
              newType: 'error',
            });
          }
        },
      });

      return;
    }

    if (!item) return;

    await updateQuiz({
      variables: {
        quizInfo: {
          id: item.id,
          ...commonInfo,
        },
      },
      onCompleted: async (data) => {
        if (data.updateQuiz?.success) {
          setToasterVisibility({
            newDuration: 5000,
            newText: t('quiz.updateSuccess'),
            newType: 'success',
          });

          await refreshSectionItems();
          handleCloseModalCallback();
        } else {
          setToasterVisibility({
            newDuration: 5000,
            newText: t('quiz.updateError'),
            newType: 'error',
          });
        }
      },
    });
  };

  return (
    // @ts-expect-error FIXME: Check why the onSuccess prop is throwing type error
    <FormContainer onSuccess={handleSubmit(onSubmit)}>
      <Typography sx={{ my: 2 }} component="h3" variant="h5">
        {mode === 'create' ? t('quiz.quizForm') : t('quiz.quizEditForm')}
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextFieldElement
          name="denomination"
          label={t('quiz.denomination')}
          control={control}
          required
          fullWidth
        />

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Box sx={{ minWidth: 140, flex: 1 }}>
            <TextFieldElement
              name="passingScore"
              label={t('quiz.passingScore')}
              type="number"
              control={control}
              fullWidth
            />
          </Box>
          <Box sx={{ minWidth: 140, flex: 1 }}>
            <TextFieldElement
              name="maxAttempts"
              label={t('quiz.maxAttempts')}
              type="number"
              control={control}
              fullWidth
            />
          </Box>
          <Box sx={{ minWidth: 140, flex: 1 }}>
            <TextFieldElement
              name="timeLimitMinutes"
              label={t('quiz.timeLimitMinutes')}
              type="number"
              control={control}
              fullWidth
            />
          </Box>
        </Box>

        <Box sx={{ minWidth: 200 }}>
          <SelectElement
            name="navigationMode"
            label={t('quiz.navigationMode.label')}
            control={control}
            options={navigationModeOptions.map((option) => ({
              id: option.id,
              label: t(option.label),
            }))}
            fullWidth
          />
        </Box>

        {navigationMode === QuizNavigationMode.Free && (
          <Box sx={{ minWidth: 200 }}>
            <TextFieldElement
              name="questionsPerPage"
              label={t('quiz.questionsPerPage')}
              type="number"
              control={control}
              fullWidth
              helperText={t('quiz.questionsPerPageHelper')}
              slotProps={{ htmlInput: { min: 0 } }}
            />
          </Box>
        )}

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <FormControlLabel
            control={
              <SwitchElement
                name="shuffleQuestions"
                control={control}
                label={t('quiz.shuffleQuestions')}
              />
            }
            label=""
            sx={{ ml: 0 }}
          />
          <FormControlLabel
            control={
              <SwitchElement
                name="shuffleAnswers"
                control={control}
                label={t('quiz.shuffleAnswers')}
              />
            }
            label=""
            sx={{ ml: 0 }}
          />
          <FormControlLabel
            control={
              <SwitchElement name="isPublished" control={control} label={t('quiz.published')} />
            }
            label=""
            sx={{ ml: 0 }}
          />
        </Box>

        <Box>
          <FormControlLabel
            control={
              <SwitchElement
                name="showCorrectAnswers"
                control={control}
                label={t('quiz.showCorrectAnswers')}
              />
            }
            label=""
            sx={{ ml: 0 }}
          />
          <FormHelperText>{t('quiz.showCorrectAnswersHelper')}</FormHelperText>
        </Box>

        <TextFieldElement
          name="feedbackPassed"
          label={t('quiz.feedbackPassed')}
          control={control}
          fullWidth
          multiline
          minRows={2}
        />
        <TextFieldElement
          name="feedbackFailed"
          label={t('quiz.feedbackFailed')}
          control={control}
          fullWidth
          multiline
          minRows={2}
        />

        <QuizQuestionsField control={control} setValue={setValue} />
      </Box>

      <DialogActions sx={{ padding: '8px 0 !important', mt: 1 }}>
        <Button onClick={handleCloseModalCallback} variant="outlined" fullWidth>
          {t('common.cancel')}
        </Button>
        <Button
          type="submit"
          disabled={isCreating || isUpdating || isLoadingNewCourseSection}
          fullWidth
        >
          {t('common.confirm')}
        </Button>
      </DialogActions>
    </FormContainer>
  );
};

export default QuizBuilderForm;
