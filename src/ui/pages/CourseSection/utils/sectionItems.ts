import { CourseSectionFragment } from '@/generated/graphql';

export type SectionItem = CourseSectionFragment['items'][0];

export type SectionComponent = {
  component_id: string;
  denomination: string;
  is_required: boolean;
  progress?: { is_completed?: boolean } | null;
};

export type QuizItem = Extract<SectionItem, { __typename: 'Quiz' }>;

export const isQuizItem = (item: SectionItem): item is QuizItem => item.__typename === 'Quiz';

/**
 * Returns the components of an item. A quiz item behaves like an item with a
 * single virtual component (the quiz itself) so the navigation logic can treat
 * every item uniformly.
 */
export const getItemComponents = (item: SectionItem): SectionComponent[] => {
  if (isQuizItem(item)) {
    return [
      {
        component_id: item.id,
        denomination: item.denomination,
        is_required: true,
        progress: item.passed ? { is_completed: true } : { is_completed: false },
      },
    ];
  }

  return item.components;
};

/** A lesson is completed when all its components are completed; a quiz when it was passed. */
export const isItemCompleted = (item: SectionItem): boolean => {
  if (isQuizItem(item)) {
    return item.passed === true;
  }

  return item.components.every((component) => component.progress?.is_completed);
};
