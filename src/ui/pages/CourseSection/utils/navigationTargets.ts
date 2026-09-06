import { CourseFragment, CourseSectionFragment } from '@/generated/graphql';

import { getItemComponents, hasSectionContent } from './sectionItems';

export type ComponentNavigationTarget = {
  sectionId: string;
  itemId: string;
  componentId: string;
};

export const getFirstIncompleteComponent = (
  sections: CourseFragment['sections'],
): ComponentNavigationTarget | null => {
  const targets = sections.filter(hasSectionContent).flatMap((section) =>
    section.items.flatMap((item) =>
      getItemComponents(item)
        .filter((comp) => !comp.progress?.is_completed)
        .map((comp) => ({
          sectionId: section.id,
          itemId: item.id,
          componentId: comp.component_id,
        })),
    ),
  );

  return targets[0] ?? null;
};

export const getNextSection = (
  sections: CourseFragment['sections'],
  currentSectionId: string,
): CourseSectionFragment | null => {
  const contentSections = sections.filter(hasSectionContent);
  const currentIndex = contentSections.findIndex((section) => section.id === currentSectionId);

  if (currentIndex === -1) {
    return null;
  }

  return contentSections[currentIndex + 1] ?? null;
};
