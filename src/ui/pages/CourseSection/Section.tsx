import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import CloseIcon from '@mui/icons-material/Close';

import { CourseSectionFragment } from '@/generated/graphql';
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
  SectionLoader,
  SectionNavigation,
} from './composition';
import QuizView from './composition/QuizView';
import { useSectionNavigation } from './hooks/useSectionNavigation';

const Section = ({ section }: { section: CourseSectionFragment }) => {
  const { t } = useTranslation();
  const { slug } = useParams();
  const navigate = useNavigate();
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

      {isUpdatingProgress ? (
        <SectionLoader />
      ) : (
        <ContentArea fullWidth={mobileOpen}>
          {!isCurrentComponentAccessible ? (
            <LockedContent
              blockingComponent={blockingComponent}
              onNavigateToRequired={navigateToComponent}
            />
          ) : selectedItem.__typename === 'Quiz' ? (
            <QuizView
              quiz={selectedItem}
              onNavigateNext={handleNavigateNext}
              onBackToCourse={navigateToCourse}
            />
          ) : (
            <>
              <ComponentHeader component={selectedComponent as Partial<ContentComponentsType>} />
              <ContentRenderer component={selectedComponent as Partial<ContentComponentsType>} />
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
