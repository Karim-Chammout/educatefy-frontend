import {
  QuizNavigationMode,
  QuizQuestionDifficulty,
  QuizQuestionMediaType,
  QuizQuestionType,
} from '@/generated/graphql';

export type QuizAnswerFormValue = {
  id?: string;
  denomination: string;
  isCorrect: boolean;
  imageUrl?: string | null;
};

export type QuizQuestionFormValue = {
  id?: string;
  prompt: string;
  questionType: QuizQuestionType;
  points: number;
  difficulty?: QuizQuestionDifficulty | null;
  hint?: string | null;
  learningObjective?: string | null;
  feedbackCorrect?: string | null;
  feedbackIncorrect?: string | null;
  mediaUrl?: string | null;
  mediaType?: QuizQuestionMediaType | null;
  answers: QuizAnswerFormValue[];
};

export type QuizFormValues = {
  denomination: string;
  isPublished: boolean;
  passingScore: number;
  maxAttempts: number;
  shuffleQuestions: boolean;
  shuffleAnswers: boolean;
  navigationMode: QuizNavigationMode;
  questionsPerPage: number;
  showCorrectAnswers: boolean;
  timeLimitMinutes: number | null;
  feedbackPassed: string;
  feedbackFailed: string;
  questions: QuizQuestionFormValue[];
};
