import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import {
  CourseSectionFragment,
  useUpdateContentComponentProgressMutation,
} from '@/generated/graphql';
import { ContentComponentsType } from '@/types/types';

export const useSectionNavigation = (section: CourseSectionFragment) => {
  const { slug, itemId, componentId } = useParams();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    [itemId ?? section.items[0].id]: true,
  });

  const selectedItem = section.items.find((item) => item.id === itemId) || section.items[0];
  const selectedComponent =
    selectedItem.components.find((comp) => comp.component_id === componentId) ||
    selectedItem.components[0];

  const [updateContentComponentProgress, { loading: isUpdatingProgress }] =
    useUpdateContentComponentProgressMutation();

  const isComponentAccessible = (targetItemId: string, targetComponentId: string) => {
    const requiredComponents: Partial<ContentComponentsType>[] = [];
    let foundTarget = false;

    section.items.forEach((item) => {
      if (foundTarget) return;

      item.components.forEach((component) => {
        if (foundTarget) return;

        if (item.id === targetItemId && component.component_id === targetComponentId) {
          foundTarget = true;

          return;
        }

        if (component.is_required) {
          requiredComponents.push(component);
        }
      });
    });

    return requiredComponents.every((comp) => comp.progress?.is_completed);
  };

  const getNextComponent = () => {
    const currentItemIndex = section.items.findIndex((item) => item.id === selectedItem.id);
    const currentComponentIndex = selectedItem.components.findIndex(
      (comp) => comp.component_id === selectedComponent.component_id,
    );

    if (currentComponentIndex < selectedItem.components.length - 1) {
      return {
        itemId: selectedItem.id,
        componentId: selectedItem.components[currentComponentIndex + 1].component_id,
      };
    }

    for (let i = currentItemIndex + 1; i < section.items.length; i++) {
      if (section.items[i].components.length > 0) {
        return {
          itemId: section.items[i].id,
          componentId: section.items[i].components[0].component_id,
        };
      }
    }

    return null;
  };

  const getBlockingComponent = () => {
    let blockingComponent = null;
    let reachedTarget = false;

    section.items.some((item) => {
      return item.components.some((component) => {
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
  };

  const handleItemClick = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleMobileMenu = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleComponentClick = (itemID: string, componentID: string) => {
    if (!isComponentAccessible(itemID, componentID)) {
      return;
    }

    navigate(`/course/${slug}/section/${section.id}/item/${itemID}/component/${componentID}`);
    setMobileOpen(false);
  };

  const handleCompleteAndNext = async () => {
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
            __typename: selectedComponent.__typename,
            id: selectedComponent.id,
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
  };

  const handleNavigateNext = () => {
    const nextComponent = getNextComponent();
    if (nextComponent) {
      navigate(
        `/course/${slug}/section/${section.id}/item/${nextComponent.itemId}/component/${nextComponent.componentId}`,
      );
    }
  };

  const navigateToComponent = (itemID: string, componentID: string) => {
    navigate(`/course/${slug}/section/${section.id}/item/${itemID}/component/${componentID}`);
  };

  const navigateToCourse = () => {
    navigate(`/course/${slug}`);
  };

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
