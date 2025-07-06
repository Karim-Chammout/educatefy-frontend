import { useMemo } from 'react';

import { CourseSectionFragment } from '@/generated/graphql';

type SectionProgressType = {
  completedComponents: number;
  totalComponents: number;
  percentage: number;
  isCompleted: boolean;
};

export const useSectionProgress = (section: CourseSectionFragment): SectionProgressType => {
  return useMemo(() => {
    let completedComponents = 0;
    let totalComponents = 0;

    section.items.forEach((item) => {
      item.components.forEach((component) => {
        totalComponents++;
        if (component.progress?.is_completed) {
          completedComponents++;
        }
      });
    });

    const percentage = totalComponents > 0 ? (completedComponents / totalComponents) * 100 : 0;
    const isCompleted = totalComponents > 0 && completedComponents === totalComponents;

    return {
      completedComponents,
      totalComponents,
      percentage,
      isCompleted,
    };
  }, [section]);
};
