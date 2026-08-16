import { useMutation } from '@apollo/client/react';
import { useCallback, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { CourseSectionFragment, UpdateContentComponentProgressDocument } from '@/generated/graphql';
import { ContentComponentsType } from '@/types/types';

import { getItemComponents, isQuizItem } from '../utils/sectionItems';

export const useSectionNavigation = (section: CourseSectionFragment) => {
  const { slug, itemId, componentId } = useParams();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    [itemId ?? section.items[0].id]: true,
  });

  const selectedItem = useMemo(
    () => section.items.find((item) => item.id === itemId) ?? null,
    [section.items, itemId],
  );
  const selectedComponent = useMemo(() => {
    if (!selectedItem) {
      return null;
    }

    const components = getItemComponents(selectedItem);

    if (isQuizItem(selectedItem)) {
      return components[0];
    }

    return components.find((comp) => comp.component_id === componentId) || components[0];
  }, [selectedItem, componentId]);

  const [updateContentComponentProgress, { loading: isUpdatingProgress }] = useMutation(
    UpdateContentComponentProgressDocument,
  );

  const isComponentAccessible = useCallback(
    (targetItemId: string, targetComponentId: string) => {
      const requiredComponents: Partial<ContentComponentsType>[] = [];
      let foundTarget = false;

      section.items.forEach((item) => {
        if (foundTarget) return;

        getItemComponents(item).forEach((component) => {
          if (foundTarget) return;

          if (item.id === targetItemId && component.component_id === targetComponentId) {
            foundTarget = true;

            return;
          }

          if (component.is_required) {
            requiredComponents.push(component as Partial<ContentComponentsType>);
          }
        });
      });

      return requiredComponents.every((comp) => comp.progress?.is_completed);
    },
    [section],
  );

  const getNextComponent = useCallback(() => {
    if (!selectedItem || !selectedComponent) {
      return null;
    }

    const currentItemIndex = section.items.findIndex((item) => item.id === selectedItem.id);
    const currentComponentIndex = getItemComponents(selectedItem).findIndex(
      (comp) => comp.component_id === selectedComponent.component_id,
    );

    if (currentComponentIndex < getItemComponents(selectedItem).length - 1) {
      return {
        itemId: selectedItem.id,
        componentId: getItemComponents(selectedItem)[currentComponentIndex + 1].component_id,
      };
    }

    for (let i = currentItemIndex + 1; i < section.items.length; i++) {
      if (getItemComponents(section.items[i]).length > 0) {
        return {
          itemId: section.items[i].id,
          componentId: getItemComponents(section.items[i])[0].component_id,
        };
      }
    }

    return null;
  }, [section.items, selectedItem, selectedComponent]);

  const getBlockingComponent = useCallback(() => {
    if (!selectedItem || !selectedComponent) {
      return null;
    }

    let blockingComponent = null;
    let reachedTarget = false;

    section.items.some((item) => {
      return getItemComponents(item).some((component) => {
        if (
          item.id === selectedItem.id &&
          component.component_id === selectedComponent.component_id
        ) {
          reachedTarget = true;

          return true;
        }

        if (!reachedTarget && component.is_required && !component.progress?.is_completed) {
          blockingComponent = {
            itemId: item.id,
            componentId: component.component_id,
            denomination: component.denomination,
          };

          return true;
        }

        return false;
      });
    });

    return blockingComponent;
  }, [section.items, selectedItem, selectedComponent]);

  const handleItemClick = useCallback((id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const handleComponentClick = useCallback(
    (itemID: string, componentID: string) => {
      if (!isComponentAccessible(itemID, componentID)) {
        return;
      }

      navigate(`/course/${slug}/section/${section.id}/item/${itemID}/component/${componentID}`);
      setMobileOpen(false);
    },
    [isComponentAccessible, navigate, slug, section.id],
  );

  const handleCompleteAndNext = useCallback(async () => {
    if (!selectedItem || !selectedComponent) {
      return;
    }

    await updateContentComponentProgress({
      variables: {
        progressInput: {
          contentComponentId: selectedComponent.component_id,
          isCompleted: true,
        },
      },
      update: (cache) => {
        cache.modify({
          id: cache.identify({
            __typename: selectedItem.__typename === 'Quiz' ? 'Quiz' : 'Lesson',
            id: selectedItem.id,
          }),
          fields: {
            progress(existingProgress) {
              return {
                ...existingProgress,
                is_completed: true,
              };
            },
          },
        });
      },
      onCompleted: (data) => {
        if (data.updateContentComponentProgress?.success) {
          const nextComponent = getNextComponent();

          if (nextComponent) {
            navigate(
              `/course/${slug}/section/${section.id}/item/${nextComponent.itemId}/component/${nextComponent.componentId}`,
            );
          }
        }
      },
    });
  }, [
    updateContentComponentProgress,
    selectedComponent,
    selectedItem,
    getNextComponent,
    navigate,
    slug,
    section.id,
  ]);

  const handleNavigateNext = useCallback(() => {
    const nextComponent = getNextComponent();
    if (nextComponent) {
      navigate(
        `/course/${slug}/section/${section.id}/item/${nextComponent.itemId}/component/${nextComponent.componentId}`,
      );
    }
  }, [getNextComponent, navigate, slug, section.id]);

  const navigateToComponent = useCallback(
    (itemID: string, componentID: string) => {
      navigate(`/course/${slug}/section/${section.id}/item/${itemID}/component/${componentID}`);
    },
    [navigate, slug, section.id],
  );

  const navigateToCourse = useCallback(() => {
    navigate(`/course/${slug}`);
  }, [navigate, slug]);

  return {
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
  };
};
