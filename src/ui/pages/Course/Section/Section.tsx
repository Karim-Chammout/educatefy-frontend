import { CourseSectionFragment } from '@/generated/graphql';

import { ContentArea, SectionContainer } from './Section.style';
import {
  ActionButtons,
  ComponentHeader,
  ContentRenderer,
  LockedContent,
  SectionHeader,
  SectionLoader,
  SectionNavigation,
} from './composition';
import { useSectionNavigation } from './hooks/useSectionNavigation';

const Section = ({ section }: { section: CourseSectionFragment }) => {
  const {
    selectedItem,
    selectedComponent,
    mobileOpen,
    openItems,
    isUpdatingProgress,
    isComponentAccessible,
    getNextComponent,
    getBlockingComponent,
    handleItemClick,
    toggleMobileMenu,
    handleComponentClick,
    handleCompleteAndNext,
    handleNavigateNext,
    navigateToComponent,
    navigateToCourse,
  } = useSectionNavigation(section);

  const isItemCompleted = (itemID: string) =>
    section.items
      .find((item) => item.id === itemID)
      ?.components.every((component) => component.progress?.is_completed) || false;

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

      {isUpdatingProgress ? (
        <SectionLoader />
      ) : (
        <ContentArea fullWidth={mobileOpen}>
          {!isCurrentComponentAccessible ? (
            <LockedContent
              blockingComponent={blockingComponent}
              onNavigateToRequired={navigateToComponent}
            />
          ) : (
            <>
              <ComponentHeader component={selectedComponent} />
              <ContentRenderer component={selectedComponent} />
              <ActionButtons
                isCompleted={isSelectedComponentCompleted}
                isItemCompleted={isItemCompleted(selectedItem.id)}
                hasNext={!!nextComponent}
                isUpdating={isUpdatingProgress}
                onCompleteAndNext={handleCompleteAndNext}
                onNavigateNext={handleNavigateNext}
                onBackToCourse={navigateToCourse}
              />
            </>
          )}
        </ContentArea>
      )}
    </SectionContainer>
  );
};

export default Section;
