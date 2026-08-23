import { useMutation, useQuery } from '@apollo/client/react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import QuizIcon from '@mui/icons-material/Quiz';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

import {
  AttemptQuestionFragment,
  CourseDocument,
  QuizAttemptQuestionDocument,
  QuizAttemptResultFragment,
  QuizNavigationMode,
  QuizQuestionDifficulty,
  QuizQuestionType,
  QuizAttemptStatus,
  StartQuizDocument,
  SubmitQuizDocument,
} from '@/generated/graphql';
import { ToasterContext } from '@/ui/context';
import { getMediaUrl } from '@/utils/getMediaUrl';

import { QuizItem } from '../utils/sectionItems';

type AttemptAnswer = {
  id: string;
  denomination: string;
  image_url?: string | null;
  is_correct?: boolean;
};

type Phase = 'idle' | 'taking' | 'completed';

const ANSWER_STORAGE_PREFIX = 'quiz-answers:';

const difficultyColors: Record<string, 'success' | 'warning' | 'error'> = {
  [QuizQuestionDifficulty.Easy]: 'success',
  [QuizQuestionDifficulty.Medium]: 'warning',
  [QuizQuestionDifficulty.Hard]: 'error',
};

const difficultyBorderColors: Record<string, string> = {
  [QuizQuestionDifficulty.Easy]: 'success.light',
  [QuizQuestionDifficulty.Medium]: 'warning.light',
  [QuizQuestionDifficulty.Hard]: 'error.light',
};

const difficultyLabelKeys: Record<string, string> = {
  [QuizQuestionDifficulty.Easy]: 'quiz.difficulty.easy',
  [QuizQuestionDifficulty.Medium]: 'quiz.difficulty.medium',
  [QuizQuestionDifficulty.Hard]: 'quiz.difficulty.hard',
};

const storageKeyForAttempt = (attemptId: string) => `${ANSWER_STORAGE_PREFIX}${attemptId}`;

const loadSavedAnswers = (attemptId: string): Record<string, string[]> => {
  try {
    const raw = localStorage.getItem(storageKeyForAttempt(attemptId));

    return raw ? (JSON.parse(raw) as Record<string, string[]>) : {};
  } catch {
    return {};
  }
};

const persistAnswers = (attemptId: string, answers: Record<string, string[]>) => {
  try {
    localStorage.setItem(storageKeyForAttempt(attemptId), JSON.stringify(answers));
  } catch {
    // Storage may be unavailable (private mode / quota). The quiz still works.
  }
};

const clearSavedAnswers = (attemptId: string) => {
  try {
    localStorage.removeItem(storageKeyForAttempt(attemptId));
  } catch {
    // ignore
  }
};

const formatDuration = (totalMinutes: number) => {
  const minutes = Math.floor(totalMinutes);
  const seconds = Math.round((totalMinutes - minutes) * 60);
  const mm = String(minutes).padStart(2, '0');
  const ss = String(seconds).padStart(2, '0');

  return `${mm}:${ss}`;
};

const QuizView = ({
  quiz,
  onNavigateNext,
  onBackToCourse,
}: {
  quiz: QuizItem;
  onNavigateNext: () => void;
  onBackToCourse: () => void;
}) => {
  const { t } = useTranslation();
  const { slug } = useParams();
  const { setToasterVisibility } = useContext(ToasterContext);

  const [phase, setPhase] = useState<Phase>('idle');
  const [attempt, setAttempt] = useState<
    (QuizAttemptResultFragment & { questions?: AttemptQuestionFragment[] | null }) | null
  >(null);
  const [answersByQuestion, setAnswersByQuestion] = useState<Record<string, string[]>>({});
  const [timeLimitSeconds, setTimeLimitSeconds] = useState<number | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedQuestions, setLoadedQuestions] = useState<Record<number, AttemptQuestionFragment>>(
    {},
  );
  const [revealedHints, setRevealedHints] = useState<Record<string, boolean>>({});
  const submittingRef = useRef(false);

  const isSequential = quiz.navigation_mode === QuizNavigationMode.Sequential;
  const questionsPerPage = quiz.questions_per_page;
  const isPaged = !isSequential && questionsPerPage > 0;
  const totalQuestions = attempt?.questionCount ?? attempt?.questions?.length ?? 0;
  const totalPages =
    isPaged && attempt?.questions?.length
      ? Math.ceil(attempt.questions.length / questionsPerPage)
      : 0;

  const [startQuiz, { loading: isStarting }] = useMutation(StartQuizDocument);
  const [submitQuiz] = useMutation(SubmitQuizDocument);
  const { refetch: refetchCourse } = useQuery(CourseDocument, {
    variables: { slug: slug || '' },
    skip: true,
  });

  const { data: singleQuestionData, loading: isQuestionLoading } = useQuery(
    QuizAttemptQuestionDocument,
    {
      variables: { attemptId: attempt?.id ?? '', index: currentIndex },
      skip:
        !isSequential || phase !== 'taking' || !attempt || loadedQuestions[currentIndex] != null,
    },
  );

  useEffect(() => {
    const currentQuestion = singleQuestionData?.quizAttemptQuestion;

    if (!currentQuestion) {
      return;
    }

    setLoadedQuestions((prev) => ({
      ...prev,
      [currentIndex]: currentQuestion,
    }));
  }, [singleQuestionData, currentIndex]);

  const completedAttempts = useMemo(
    () =>
      quiz.attempts.filter((attemptItem) => attemptItem.status === QuizAttemptStatus.Completed)
        .length,
    [quiz.attempts],
  );
  const attemptsRemaining =
    quiz.max_attempts === 0 ? Infinity : Math.max(0, quiz.max_attempts - completedAttempts);
  const canTakeQuiz = attemptsRemaining > 0 && quiz.is_published;

  const handleStart = async () => {
    setErrorMessage(null);

    const { data } = await startQuiz({
      variables: { quizId: quiz.id, withQuestions: !isSequential },
    });

    if (!data?.startQuiz) {
      return;
    }

    if (!data.startQuiz.success) {
      const message = data.startQuiz.errors[0]?.message;
      setErrorMessage(message || t('quiz.startError'));

      return;
    }

    if (!data.startQuiz.quizAttempt) {
      return;
    }

    const startedAttempt = data.startQuiz.quizAttempt;
    // A brand new attempt has a new id (so no saved answers yet); a resumed
    // attempt reuses its id and its locally saved answers are restored.
    const restoredAnswers = loadSavedAnswers(startedAttempt.id);

    setAttempt(startedAttempt);
    setAnswersByQuestion(restoredAnswers);
    setCurrentIndex(0);
    setLoadedQuestions({});
    setRevealedHints({});
    setPhase('taking');

    const timeLimit = data.startQuiz.timeLimitMinutes ?? null;
    setTimeLimitSeconds(timeLimit);

    if (timeLimit && timeLimit > 0) {
      // Recompute from the server's started_at so a refresh cannot restart
      // the countdown. Clamps to 0, which triggers the auto-submit below.
      const startedAtMs = new Date(startedAttempt.started_at).getTime();
      const remainingMs = startedAtMs + timeLimit * 60 * 1000 - Date.now();
      setRemainingSeconds(Math.max(0, Math.ceil(remainingMs / 1000)));
    } else {
      setRemainingSeconds(null);
    }
  };

  const handleToggleAnswer = (
    questionId: string,
    answerId: string,
    questionType: QuizQuestionType,
  ) => {
    setAnswersByQuestion((prev) => {
      const current = prev[questionId] ?? [];

      let next: string[];

      if (questionType === QuizQuestionType.MultiSelect) {
        next = current.includes(answerId)
          ? current.filter((id) => id !== answerId)
          : [...current, answerId];
      } else {
        next = [answerId];
      }

      const updated = { ...prev, [questionId]: next };

      if (attempt) {
        persistAnswers(attempt.id, updated);
      }

      return updated;
    });
  };

  const handleSubmit = async (autoTimedOut = false) => {
    if (!attempt || submittingRef.current) {
      return;
    }

    submittingRef.current = true;
    setIsSubmitting(true);
    setErrorMessage(null);

    const answers = Object.entries(answersByQuestion)
      .map(([questionId, answerIds]) => ({
        questionId,
        answerIds: answerIds.map((id) => String(id)),
      }))
      .filter((item) => item.answerIds.length > 0);

    let data;

    try {
      ({ data } = await submitQuiz({
        variables: {
          submission: {
            attemptId: attempt.id,
            answers,
          },
        },
      }));
    } catch {
      setErrorMessage(t('quiz.submitError'));
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }

    if (!data?.submitQuiz) {
      return;
    }

    if (!data.submitQuiz.success) {
      const message = data.submitQuiz.errors[0]?.message;
      setErrorMessage(message || t('quiz.submitError'));
      setPhase('taking');

      return;
    }

    if (!data.submitQuiz.quizAttempt) {
      return;
    }

    clearSavedAnswers(attempt.id);

    setAttempt(data.submitQuiz.quizAttempt);
    setPhase('completed');

    if (autoTimedOut) {
      setToasterVisibility({
        newText: t('quiz.timedOut'),
        newType: 'info',
        newDuration: 4000,
      });
    }

    await refetchCourse();
  };

  const submitRef = useRef(handleSubmit);
  submitRef.current = handleSubmit;

  useEffect(() => {
    if (remainingSeconds === null) {
      return undefined;
    }

    if (remainingSeconds <= 0) {
      submitRef.current(true);

      return undefined;
    }

    const interval = window.setInterval(() => {
      setRemainingSeconds((prev) => (prev === null ? null : prev - 1));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [remainingSeconds]);

  useEffect(() => {
    const currentQuestion = singleQuestionData?.quizAttemptQuestion;

    if (currentQuestion) {
      return;
    }

    // The server refused to serve the question (e.g. the attempt already
    // expired server-side while the tab was in the background). Submit what we
    // have instead of leaving the student stuck on the loading spinner.
    if (
      singleQuestionData &&
      phase === 'taking' &&
      isSequential &&
      attempt &&
      !loadedQuestions[currentIndex]
    ) {
      submitRef.current(true);
    }
  }, [singleQuestionData, currentIndex, phase, attempt, loadedQuestions, isSequential]);

  const parseAnswers = (question: AttemptQuestionFragment): AttemptAnswer[] => {
    if (!Array.isArray(question.answers)) {
      return [];
    }

    return (question.answers as AttemptAnswer[]).map((answer) => ({
      ...answer,
      id: String(answer.id),
    }));
  };

  const getSelectedAnswerIds = (questionId: string): string[] =>
    answersByQuestion[questionId] ?? [];

  const currentSequentialQuestion = isSequential ? (loadedQuestions[currentIndex] ?? null) : null;
  const isCurrentAnswered =
    !!currentSequentialQuestion &&
    (answersByQuestion[currentSequentialQuestion.id] ?? []).length > 0;
  const visibleQuestions = isPaged
    ? (attempt?.questions ?? []).slice(
        currentIndex * questionsPerPage,
        (currentIndex + 1) * questionsPerPage,
      )
    : (attempt?.questions ?? []);

  const renderQuestionMedia = (question: AttemptQuestionFragment) => {
    if (!question.media_url) {
      return null;
    }

    return question.media_type === 'video' ? (
      <Box
        component="video"
        src={getMediaUrl(question.media_url)}
        controls
        sx={{ maxWidth: '100%', maxHeight: 260, borderRadius: 1, mb: 1.5 }}
      />
    ) : (
      <Box
        component="img"
        src={getMediaUrl(question.media_url)}
        sx={{ maxWidth: '100%', maxHeight: 260, borderRadius: 1, mb: 1.5 }}
      />
    );
  };

  const renderAnswerLabel = (answer: AttemptAnswer) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {answer.image_url && (
        <Box
          component="img"
          src={getMediaUrl(answer.image_url)}
          sx={{ width: 36, height: 36, objectFit: 'cover', borderRadius: 0.5, flexShrink: 0 }}
        />
      )}
      <Typography variant="body2">{answer.denomination}</Typography>
    </Box>
  );

  const renderQuestionCard = (question: AttemptQuestionFragment, questionIndex: number) => {
    const answers = parseAnswers(question);
    const selected = getSelectedAnswerIds(question.id);
    const isMultiSelect = question.question_type === QuizQuestionType.MultiSelect;
    const isHintRevealed = revealedHints[question.id] === true;
    const borderColor = question.difficulty
      ? difficultyBorderColors[question.difficulty]
      : undefined;

    return (
      <Paper
        key={question.id}
        variant="outlined"
        sx={{
          p: 2.5,
          mb: 2,
          borderLeft: borderColor ? '3px solid' : undefined,
          borderColor,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mb: 1.5,
            alignItems: 'flex-start',
          }}
        >
          <Typography sx={{ flexGrow: 1, mr: 2, fontWeight: 'bold' }}>
            {questionIndex + 1}. {question.prompt}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
            {question.difficulty && (
              <Chip
                label={t(difficultyLabelKeys[question.difficulty])}
                color={difficultyColors[question.difficulty]}
                size="small"
              />
            )}
            <Typography variant="caption" color="text.secondary">
              {question.points} {t('quiz.points')}
            </Typography>
          </Box>
        </Box>

        {question.learning_objective && (
          <Alert severity="info" sx={{ mb: 1.5 }}>
            {question.learning_objective}
          </Alert>
        )}

        {renderQuestionMedia(question)}

        {isMultiSelect ? (
          <Box>
            {answers.map((answer) => (
              <FormControlLabel
                key={answer.id}
                control={
                  <Checkbox
                    checked={selected.includes(answer.id)}
                    onChange={() =>
                      handleToggleAnswer(question.id, answer.id, question.question_type)
                    }
                  />
                }
                label={renderAnswerLabel(answer)}
                sx={{ display: 'flex', mb: 0.5 }}
              />
            ))}
          </Box>
        ) : (
          <RadioGroup
            value={selected.length > 0 ? selected[0] : ''}
            onChange={(event) =>
              handleToggleAnswer(question.id, event.target.value, question.question_type)
            }
          >
            {answers.map((answer) => (
              <FormControlLabel
                key={answer.id}
                value={answer.id}
                control={<Radio />}
                label={renderAnswerLabel(answer)}
              />
            ))}
          </RadioGroup>
        )}

        {question.hint && (
          <Box sx={{ mt: 1.5 }}>
            {isHintRevealed ? (
              <Alert severity="info" icon={<LightbulbOutlinedIcon />}>
                {question.hint}
              </Alert>
            ) : (
              <Button
                size="small"
                variant="text"
                color="primary"
                startIcon={<LightbulbOutlinedIcon />}
                onClick={() => setRevealedHints((prev) => ({ ...prev, [question.id]: true }))}
              >
                {t('quiz.showHint')}
              </Button>
            )}
          </Box>
        )}
      </Paper>
    );
  };

  const isAttemptPassed = attempt?.passed === true;
  const revealAnswers = quiz.show_correct_answers !== false;

  return (
    <Box>
      {phase === 'idle' && (
        <Card sx={{ maxWidth: 720, mx: 'auto' }}>
          <CardContent sx={{ textAlign: 'center', p: 4 }}>
            <QuizIcon sx={{ fontSize: 56, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: 'bold' }} gutterBottom>
              {quiz.denomination}
            </Typography>

            <Box
              sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 2, flexWrap: 'wrap' }}
            >
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" color="primary.main" sx={{ fontWeight: 'bold' }}>
                  {quiz.passing_score}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('quiz.passingScore')}
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" color="primary.main" sx={{ fontWeight: 'bold' }}>
                  {quiz.max_attempts === 0 ? '∞' : quiz.max_attempts}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('quiz.maxAttempts')}
                </Typography>
              </Box>
            </Box>

            {quiz.attempts.length > 0 && (
              <Box sx={{ mt: 3, textAlign: 'left' }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  {t('quiz.attemptsHistory')}
                </Typography>
                {quiz.attempts.map((attemptItem) => (
                  <Box
                    key={attemptItem.id}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      py: 0.5,
                    }}
                  >
                    <Typography variant="body2">
                      {t('quiz.attemptLabel', { number: attemptItem.attempt_number })}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color:
                          attemptItem.status === QuizAttemptStatus.Completed
                            ? attemptItem.passed
                              ? 'success.main'
                              : 'error.main'
                            : 'text.secondary',
                        fontWeight: 'bold',
                      }}
                    >
                      {attemptItem.status === QuizAttemptStatus.Completed
                        ? attemptItem.score != null
                          ? `${attemptItem.score}%`
                          : t('quiz.completed')
                        : t('quiz.inProgress')}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}

            {errorMessage && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {errorMessage}
              </Alert>
            )}

            {!quiz.is_published && (
              <Alert severity="info" sx={{ mt: 2 }}>
                {t('quiz.notPublished')}
              </Alert>
            )}

            {quiz.is_published && attemptsRemaining === 0 && (
              <Alert severity="info" sx={{ mt: 2 }}>
                {t('quiz.noAttemptsLeft')}
              </Alert>
            )}

            <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button variant="outlined" onClick={onBackToCourse}>
                {t('common.back')}
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleStart}
                disabled={!canTakeQuiz || isStarting}
                startIcon={isStarting ? <CircularProgress size={18} /> : <QuizIcon />}
              >
                {isStarting ? t('quiz.starting') : t('quiz.start')}
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}

      {phase === 'taking' && attempt && (
        <Card sx={{ maxWidth: 820, mx: 'auto' }}>
          <CardContent sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
                flexWrap: 'wrap',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {quiz.denomination}
              </Typography>
              {timeLimitSeconds !== null && remainingSeconds !== null && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AccessTimeIcon
                    sx={{ color: remainingSeconds < 60 ? 'error.main' : 'text.secondary' }}
                  />
                  <Typography
                    variant="body1"
                    color={remainingSeconds < 60 ? 'error.main' : 'text.secondary'}
                    sx={{ fontWeight: 'bold' }}
                  >
                    {formatDuration(remainingSeconds / 60)}
                  </Typography>
                </Box>
              )}
            </Box>

            <Divider sx={{ mb: 2 }} />

            {errorMessage && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {errorMessage}
              </Alert>
            )}

            {isSequential ? (
              totalQuestions === 0 ? (
                <Alert severity="info" sx={{ mb: 2 }}>
                  {t('quiz.noQuestionsToShow')}
                </Alert>
              ) : isQuestionLoading || !currentSequentialQuestion ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
                  <CircularProgress />
                </Box>
              ) : (
                renderQuestionCard(currentSequentialQuestion, currentIndex)
              )
            ) : (
              visibleQuestions.map((question, idx) =>
                renderQuestionCard(question, isPaged ? currentIndex * questionsPerPage + idx : idx),
              )
            )}

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: 2,
                flexWrap: 'wrap',
                gap: 1,
              }}
            >
              <Button variant="outlined" onClick={onBackToCourse}>
                {t('common.back')}
              </Button>

              {isSequential ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Button
                    variant="outlined"
                    onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                    disabled={currentIndex === 0 || isSubmitting}
                  >
                    {t('common.previous')}
                  </Button>
                  <Typography variant="body2" color="text.secondary">
                    {t('quiz.questionOf', { current: currentIndex + 1, total: totalQuestions })}
                  </Typography>
                  {currentIndex < totalQuestions - 1 ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => setCurrentIndex((prev) => prev + 1)}
                      disabled={!isCurrentAnswered || isSubmitting}
                    >
                      {t('common.next')}
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleSubmit(false)}
                      disabled={!isCurrentAnswered || isSubmitting}
                      startIcon={isSubmitting ? <CircularProgress size={18} /> : null}
                    >
                      {isSubmitting ? t('quiz.submitting') : t('quiz.submit')}
                    </Button>
                  )}
                </Box>
              ) : isPaged ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Button
                    variant="outlined"
                    onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                    disabled={currentIndex === 0 || isSubmitting}
                  >
                    {t('common.previous')}
                  </Button>
                  <Typography variant="body2" color="text.secondary">
                    {t('quiz.pageOf', { current: currentIndex + 1, total: totalPages })}
                  </Typography>
                  {currentIndex < totalPages - 1 ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => setCurrentIndex((prev) => prev + 1)}
                      disabled={isSubmitting}
                    >
                      {t('common.next')}
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleSubmit(false)}
                      disabled={isSubmitting}
                      startIcon={isSubmitting ? <CircularProgress size={18} /> : null}
                    >
                      {isSubmitting ? t('quiz.submitting') : t('quiz.submit')}
                    </Button>
                  )}
                </Box>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSubmit(false)}
                  disabled={isSubmitting}
                  startIcon={isSubmitting ? <CircularProgress size={18} /> : null}
                >
                  {isSubmitting ? t('quiz.submitting') : t('quiz.submit')}
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>
      )}

      {phase === 'completed' && attempt && (
        <Card sx={{ maxWidth: 820, mx: 'auto' }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              {isAttemptPassed ? (
                <CheckCircleIcon sx={{ fontSize: 56, color: 'success.main', mb: 1 }} />
              ) : (
                <CancelIcon sx={{ fontSize: 56, color: 'error.main', mb: 1 }} />
              )}
              <Typography
                variant="h5"
                color={isAttemptPassed ? 'success.main' : 'error.main'}
                sx={{ fontWeight: 'bold' }}
              >
                {isAttemptPassed ? t('quiz.passed') : t('quiz.failed')}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {t('quiz.scoreLabel', {
                  score: attempt.score != null ? attempt.score : 0,
                  passingScore: quiz.passing_score,
                })}
              </Typography>
              {attempt.timed_out && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  {t('quiz.timedOut')}
                </Typography>
              )}
            </Box>

            {isAttemptPassed && quiz.feedback_passed && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {quiz.feedback_passed}
              </Alert>
            )}
            {!isAttemptPassed && quiz.feedback_failed && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {quiz.feedback_failed}
              </Alert>
            )}

            <Divider sx={{ mb: 2 }} />

            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }} gutterBottom>
              {t('quiz.reviewTitle')}
            </Typography>

            {(attempt.questions ?? []).map((question, questionIndex) => {
              const answers = parseAnswers(question);
              const selected = getSelectedAnswerIds(question.id);
              const correctIds = answers
                .filter((answer) => answer.is_correct)
                .map((answer) => answer.id);
              const isAnswerCorrect =
                selected.length > 0 &&
                selected.length === correctIds.length &&
                selected.every((id) => correctIds.includes(id));
              const isQuestionCorrect = revealAnswers && isAnswerCorrect;
              const borderColor = question.difficulty
                ? difficultyBorderColors[question.difficulty]
                : undefined;

              return (
                <Paper
                  key={question.id}
                  variant="outlined"
                  sx={{
                    p: 2.5,
                    mb: 2,
                    borderLeft: borderColor ? '3px solid' : undefined,
                    borderColor,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 1,
                      alignItems: 'flex-start',
                    }}
                  >
                    <Typography
                      color={
                        revealAnswers
                          ? isQuestionCorrect
                            ? 'success.main'
                            : 'error.main'
                          : 'text.primary'
                      }
                      sx={{ flexGrow: 1, mr: 2, fontWeight: 'bold' }}
                    >
                      {questionIndex + 1}. {question.prompt}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
                      {question.difficulty && (
                        <Chip
                          label={t(difficultyLabelKeys[question.difficulty])}
                          color={difficultyColors[question.difficulty]}
                          size="small"
                        />
                      )}
                      <Typography variant="caption" color="text.secondary">
                        {question.points} {t('quiz.points')}
                      </Typography>
                    </Box>
                  </Box>

                  {question.learning_objective && (
                    <Alert severity="info" sx={{ mb: 1.5 }}>
                      {question.learning_objective}
                    </Alert>
                  )}

                  {renderQuestionMedia(question)}

                  {answers.map((answer) => {
                    const wasSelected = selected.includes(answer.id);
                    const isCorrectAnswer = revealAnswers && answer.is_correct === true;

                    return (
                      <Box
                        key={answer.id}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          py: 0.5,
                          px: 1,
                          borderRadius: 1,
                          bgcolor: revealAnswers
                            ? isCorrectAnswer
                              ? 'success.light'
                              : wasSelected
                                ? 'error.light'
                                : 'transparent'
                            : wasSelected
                              ? 'primary.light'
                              : 'transparent',
                        }}
                      >
                        {revealAnswers && isCorrectAnswer && (
                          <CheckCircleIcon sx={{ fontSize: 18, color: 'success.main' }} />
                        )}
                        {answer.image_url && (
                          <Box
                            component="img"
                            src={getMediaUrl(answer.image_url)}
                            sx={{
                              width: 36,
                              height: 36,
                              objectFit: 'cover',
                              borderRadius: 0.5,
                              flexShrink: 0,
                            }}
                          />
                        )}
                        <Typography variant="body2">{answer.denomination}</Typography>
                      </Box>
                    );
                  })}

                  {isAnswerCorrect && question.feedback_correct && (
                    <Alert severity="success" sx={{ mt: 1.5 }}>
                      {question.feedback_correct}
                    </Alert>
                  )}
                  {!isAnswerCorrect && question.feedback_incorrect && (
                    <Alert severity="error" sx={{ mt: 1.5 }}>
                      {question.feedback_incorrect}
                    </Alert>
                  )}
                </Paper>
              );
            })}

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mt: 3,
                flexWrap: 'wrap',
                gap: 1,
              }}
            >
              <Button variant="outlined" onClick={onBackToCourse}>
                {t('common.back')}
              </Button>
              {canTakeQuiz && (
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => setPhase('idle')}
                  disabled={isSubmitting}
                >
                  {t('quiz.retake')}
                </Button>
              )}
              <Button variant="contained" color="primary" onClick={onNavigateNext}>
                {t('quiz.nextLesson')}
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default QuizView;
