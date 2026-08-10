import { useMemo } from 'react';

import { CourseSectionFragment } from '@/generated/graphql';
import { isItemCompleted } from '@/ui/pages/CourseSection/utils/sectionItems';

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
      if (item.__typename === 'Quiz') {
        totalComponents++;
        if (isItemCompleted(item)) {
          completedComponents++;
        }

        return;
      }

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
