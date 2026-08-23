import { QuizQuestionDifficulty, QuizQuestionType } from '@/generated/graphql';

export const questionTypeOptions = [
  { id: QuizQuestionType.SingleChoice, label: 'quiz.questionType.singleChoice' },
  { id: QuizQuestionType.MultiSelect, label: 'quiz.questionType.multiSelect' },
  { id: QuizQuestionType.TrueFalse, label: 'quiz.questionType.trueFalse' },
];

export const difficultyOptions = [
  { id: QuizQuestionDifficulty.Easy, label: 'quiz.difficulty.easy' },
  { id: QuizQuestionDifficulty.Medium, label: 'quiz.difficulty.medium' },
  { id: QuizQuestionDifficulty.Hard, label: 'quiz.difficulty.hard' },
];

export const questionTypeColors: Record<string, 'default' | 'primary' | 'secondary' | 'success'> = {
  [QuizQuestionType.SingleChoice]: 'primary',
  [QuizQuestionType.MultiSelect]: 'secondary',
  [QuizQuestionType.TrueFalse]: 'success',
};

export const difficultyColors: Record<string, string> = {
  [QuizQuestionDifficulty.Easy]: 'success.light',
  [QuizQuestionDifficulty.Medium]: 'warning.light',
  [QuizQuestionDifficulty.Hard]: 'error.light',
};

export const mediaAccept = {
  'image/png': ['.png'],
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/webp': ['.webp'],
  'image/gif': ['.gif'],
  'image/svg+xml': ['.svg'],
  'video/mp4': ['.mp4'],
  'video/webm': ['.webm'],
  'video/ogg': ['.ogv'],
};
