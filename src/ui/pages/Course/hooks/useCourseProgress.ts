import { useMemo } from 'react';

import { CourseFragment } from '@/generated/graphql';
import { isItemCompleted } from '@/ui/pages/CourseSection/utils/sectionItems';

type CourseProgressType = {
  completedSections: number;
  totalSections: number;
  percentage: number;
  isCompleted: boolean;
};

export const useCourseProgress = (course: CourseFragment): CourseProgressType => {
  return useMemo(() => {
    let completedSections = 0;

    const totalSections = course.sections.length;

    course.sections.forEach((section) => {
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

      if (totalComponents > 0 && completedComponents === totalComponents) {
        completedSections++;
      }
    });

    const percentage = totalSections > 0 ? (completedSections / totalSections) * 100 : 0;
    const isCompleted = totalSections > 0 && completedSections === totalSections;

    return {
      completedSections,
      totalSections,
      percentage,
      isCompleted,
    };
  }, [course]);
};
