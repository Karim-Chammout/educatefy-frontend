import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import CloseIcon from '@mui/icons-material/Close';

import { CourseFragment, CourseSectionFragment } from '@/generated/graphql';
import { ContentComponentsType } from '@/types/types';
import { InfoState } from '@/ui/compositions';

import { isItemCompleted as isItemCompletedItem } from './utils/sectionItems';
import { ContentArea, SectionContainer } from './Section.style';
import {
  ActionButtons,
  ComponentHeader,
  ContentRenderer,
  LockedContent,
  SectionHeader,
  SectionNavigation,
} from './composition';
import QuizView from './composition/QuizView';
import { useSectionNavigation } from './hooks/useSectionNavigation';

const Section = ({
  section,
  sections,
  courseId,
  onCourseCompleted,
  refetchCourse,
}: {
  section: CourseSectionFragment;
  sections: CourseFragment['sections'];
  courseId: string;
  onCourseCompleted: () => void;
  refetchCourse: () => Promise<unknown>;
}) => {
  const { t } = useTranslation();
  const { slug } = useParams();
  const navigate = useNavigate();
  const {
    selectedItem,
    selectedComponent,
    mobileOpen,
    openItems,
    isUpdatingProgress,
    hasNextSection,
    isComponentAccessible,
    getNextComponent,
    getBlockingComponent,
    handleItemClick,
    toggleMobileMenu,
    handleComponentClick,
    handleCompleteAndNext,
    handleNavigateNext,
    navigateToNextSection,
    navigateToComponent,
    navigateToCourse,
  } = useSectionNavigation(section, {
    onCourseCompleted,
    sections,
    courseId,
  });

  const isItemCompleted = useCallback(
    (itemID: string) => {
      const item = section.items.find((sectionItem) => sectionItem.id === itemID);

      return item ? isItemCompletedItem(item) : false;
    },
    [section.items],
  );

  if (!selectedItem || !selectedComponent) {
    return (
      <InfoState
        btnLabel={t('courseSection.backToCourse')}
        btnOnClick={() => navigate(`/course/${slug}`)}
        subtitle={t('sectionItem.noSectionItemSubtitle')}
        title={t('sectionItem.itemNotFound')}
        icon={<CloseIcon />}
      />
    );
  }

  const isSelectedComponentCompleted = selectedComponent.progress?.is_completed || false;
  const isCurrentComponentAccessible = isComponentAccessible(
    selectedItem.id,
    selectedComponent.component_id,
  );
  const blockingComponent = getBlockingComponent();
  const nextComponent = getNextComponent();

  return (
    <SectionContainer>
      <SectionHeader
        componentDenomination={selectedComponent.denomination}
        onMenuToggle={toggleMobileMenu}
      />

      <SectionNavigation
        section={section}
        mobileOpen={mobileOpen}
        openItems={openItems}
        selectedItemId={selectedItem.id}
        selectedComponentId={selectedComponent.component_id}
        onItemClick={handleItemClick}
        onComponentClick={handleComponentClick}
        onBackClick={navigateToCourse}
        isComponentAccessible={isComponentAccessible}
        isItemCompleted={isItemCompleted}
      />

      <ContentArea fullWidth={mobileOpen}>
        {!isCurrentComponentAccessible ? (
          <LockedContent
            blockingComponent={blockingComponent}
            onNavigateToRequired={navigateToComponent}
          />
        ) : selectedItem.__typename === 'Quiz' ? (
          <QuizView
            key={selectedItem.id}
            quiz={selectedItem}
            courseId={courseId}
            refetchCourse={refetchCourse}
            onNavigateNext={handleNavigateNext}
            onBackToCourse={navigateToCourse}
            onCourseCompleted={onCourseCompleted}
            hasNextComponent={!!nextComponent}
            hasNextSection={hasNextSection}
          />
        ) : (
          <>
            <ComponentHeader component={selectedComponent as Partial<ContentComponentsType>} />
            <ContentRenderer component={selectedComponent as Partial<ContentComponentsType>} />
            <ActionButtons
              isCompleted={isSelectedComponentCompleted}
              isItemCompleted={isItemCompleted(selectedItem.id)}
              hasNext={!!nextComponent}
              hasNextSection={hasNextSection}
              isUpdating={isUpdatingProgress}
              onCompleteAndNext={handleCompleteAndNext}
              onNavigateNext={handleNavigateNext}
              onNavigateNextSection={navigateToNextSection}
              onBackToCourse={navigateToCourse}
            />
          </>
        )}
      </ContentArea>
    </SectionContainer>
  );
};

export default Section;
