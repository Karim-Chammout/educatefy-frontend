import { useLazyQuery, useMutation } from '@apollo/client/react';
import { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  ComponentParentType,
  ComponentType,
  ContentComponent,
  CreateContentComponentDocument,
  DeleteContentComponentDocument,
  EditableCourseSectionDocument,
  EditableCourseSectionQuery,
  SectionFragment,
  UpdateContentComponentDocument,
  UpdateContentComponentRanksDocument,
} from '@/generated/graphql';
import {
  BaseComponentDataType,
  CONTENT_COMPONENT_REGISTRY,
  ContentComponentConfig,
  getContentComponentConfig,
} from '@/ui/compositions/ContentComponents';
import { ToasterContext } from '@/ui/context';

type ContentComponentType = Extract<
  SectionFragment['items'][0],
  { __typename: 'Lesson' }
>['components'];

type ComponentContextState = {
  componentItems: ContentComponentType;
  setComponentItems: (items: ContentComponentType) => void;

  isCreateModalOpen: boolean;
  isEditModalOpen: boolean;
  isDeleteModalOpen: boolean;

  selectedComponentType: ContentComponentConfig | null;
  editingComponent: { id: string | null; isEditing: boolean };
  componentToDelete: { id: string; type: ComponentType } | null;

  baseComponentData: BaseComponentDataType;
  componentData: Partial<ContentComponent> | null;

  openCreateModal: () => void;
  closeCreateModal: () => void;
  openEditModal: (componentId: string) => void;
  closeEditModal: () => void;
  openDeleteModal: (componentId: string, componentType: ComponentType) => void;
  closeDeleteModal: () => void;

  setSelectedComponentType: (config: ContentComponentConfig | null) => void;
  updateBaseComponentData: (data: Partial<BaseComponentDataType>) => void;
  updateComponentData: (data: Partial<ContentComponent>) => void;
  resetComponentData: () => void;

  createComponent: () => Promise<void>;
  isCreateingComponent: boolean;
  updateComponent: () => Promise<void>;
  isUpdatingComponent: boolean;
  deleteComponent: () => Promise<void>;
  handleDragEnd: (event: DragEndEvent) => Promise<void>;

  getAvailableComponents: () => ContentComponentConfig[];
};

const ComponentContext = createContext<ComponentContextState | undefined>(undefined);

export const useComponentContext = () => {
  const context = useContext(ComponentContext);
  if (!context) {
    throw new Error('useComponentContext must be used within a ComponentProvider');
  }

  return context;
};

type ComponentProviderType = {
  children: ReactNode;
  initialComponents: ContentComponentType;
  courseId?: string;
  sectionId?: string;
  itemId?: string;
  parentId: string;
};

const ComponentProvider = ({
  children,
  initialComponents,
  courseId,
  sectionId,
  itemId,
  parentId,
}: ComponentProviderType) => {
  const { t } = useTranslation();
  const { setToasterVisibility } = useContext(ToasterContext);

  const [componentItems, setComponentItems] = useState(initialComponents);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [selectedComponentType, setSelectedComponentType] = useState<ContentComponentConfig | null>(
    null,
  );
  const [editingComponent, setEditingComponent] = useState<{
    id: string | null;
    isEditing: boolean;
  }>({
    id: null,
    isEditing: false,
  });
  const [componentToDelete, setComponentToDelete] = useState<{
    id: string;
    type: ComponentType;
  } | null>(null);

  const [baseComponentData, setBaseComponentData] = useState<BaseComponentDataType>({
    denomination: '',
    isPublished: true,
    isRequired: false,
  });
  const [componentData, setComponentData] = useState<Partial<ContentComponent> | null>(null);

  const [deleteContentComponent] = useMutation(DeleteContentComponentDocument);
  const [updateContentComponentRanks] = useMutation(UpdateContentComponentRanksDocument);
  const [updateContentComponent, { loading: isUpdatingComponent }] = useMutation(
    UpdateContentComponentDocument,
  );
  const [createContentComponent, { loading: isCreateingComponent }] = useMutation(
    CreateContentComponentDocument,
  );
  const [editableCourseSection] = useLazyQuery(EditableCourseSectionDocument, {
    fetchPolicy: 'network-only',
  });

  const resetComponentData = useCallback(() => {
    setBaseComponentData({
      denomination: '',
      isPublished: true,
      isRequired: false,
    });
    setComponentData(null);
    setSelectedComponentType(null);
  }, []);

  const getAvailableComponents = useCallback(() => {
    return CONTENT_COMPONENT_REGISTRY.map((config) => ({
      ...config,
      label: t(`sectionItem.${config.label}Option`),
    }));
  }, [t]);

  const openCreateModal = useCallback(() => {
    resetComponentData();
    setIsCreateModalOpen(true);
  }, [resetComponentData]);

  const closeCreateModal = useCallback(() => {
    setIsCreateModalOpen(false);
    resetComponentData();
  }, [resetComponentData]);

  const openEditModal = useCallback(
    (componentId: string) => {
      const component = componentItems.find((item) => item.component_id === componentId);
      if (!component) return;

      const config = getContentComponentConfig(component.__typename);
      if (!config) return;

      setSelectedComponentType(config);

      setBaseComponentData({
        denomination: component.denomination,
        isPublished: component.is_published,
        isRequired: component.is_required,
      });

      setComponentData(config.buildEditData(component as ContentComponent));

      setEditingComponent({ id: componentId, isEditing: true });
      setIsEditModalOpen(true);
    },
    [componentItems],
  );

  const closeEditModal = useCallback(() => {
    setIsEditModalOpen(false);
    setEditingComponent({ id: null, isEditing: false });
    resetComponentData();
  }, [resetComponentData]);

  const openDeleteModal = useCallback((componentId: string, componentType: ComponentType) => {
    setComponentToDelete({ id: componentId, type: componentType });
    setIsDeleteModalOpen(true);
  }, []);

  const closeDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false);
    setComponentToDelete(null);
  }, []);

  const updateBaseComponentData = useCallback((data: Partial<BaseComponentDataType>) => {
    setBaseComponentData((prev) => ({ ...prev, ...data }));
  }, []);

  const updateComponentData = useCallback((data: Partial<ContentComponent>) => {
    setComponentData((prev) => ({ ...prev, ...data }));
  }, []);

  const createComponent = useCallback(async () => {
    if (!selectedComponentType || !componentData) return;

    try {
      const componentPayload = selectedComponentType.createPayload(componentData);

      await createContentComponent({
        variables: {
          baseComponentInfo: {
            denomination: baseComponentData.denomination,
            isPublished: baseComponentData.isPublished,
            type: selectedComponentType.type,
            isRequired: baseComponentData.isRequired,
            parentType: ComponentParentType.Lesson,
            parentId,
          },
          ...componentPayload,
        },
        onCompleted(res) {
          if (res.createContentComponent?.success) {
            const newComponent = res.createContentComponent.component;
            if (newComponent) {
              setComponentItems((prev) => [...prev, newComponent]);
            }
            closeCreateModal();
            setToasterVisibility({
              newDuration: 5000,
              newText: t('contentComponent.createdSuccessfully'),
              newType: 'success',
            });
          } else {
            setToasterVisibility({
              newDuration: 5000,
              newText: t('error.message'),
              newType: 'error',
            });
          }
        },
      });
    } catch (_error) {
      setToasterVisibility({
        newDuration: 5000,
        newText: t('error.message'),
        newType: 'error',
      });
    }
  }, [
    selectedComponentType,
    componentData,
    baseComponentData,
    parentId,
    createContentComponent,
    closeCreateModal,
    setToasterVisibility,
    t,
  ]);

  const updateComponent = useCallback(async () => {
    if (!editingComponent.id || !selectedComponentType || !componentData) return;

    try {
      const componentPayload = selectedComponentType.createPayload(componentData);

      await updateContentComponent({
        variables: {
          baseComponentInfo: {
            id: editingComponent.id,
            denomination: baseComponentData.denomination,
            isPublished: baseComponentData.isPublished,
            type: selectedComponentType.type,
            isRequired: baseComponentData.isRequired,
          },
          ...componentPayload,
        },
        async onCompleted(res) {
          if (res.updateContentComponent?.success) {
            const refetchResult = await editableCourseSection({
              variables: { id: courseId || '' },
            });

            const courseSection = refetchResult.data?.editableCourse?.sections.find(
              (section) => section.id === sectionId,
            );

            if (courseSection) {
              const courseSectionItem = courseSection.items.find(
                (item): item is Extract<typeof item, { __typename: 'Lesson' }> =>
                  item.itemId === itemId && item.__typename === 'Lesson',
              );
              if (courseSectionItem) {
                setComponentItems(courseSectionItem.components);
              }
            }

            closeEditModal();
            setToasterVisibility({
              newDuration: 5000,
              newText: t('contentComponent.updatedSuccessfully'),
              newType: 'success',
            });
          } else {
            setToasterVisibility({
              newDuration: 5000,
              newText: t('error.message'),
              newType: 'error',
            });
          }
        },
      });
    } catch (_error) {
      setToasterVisibility({
        newDuration: 5000,
        newText: t('error.message'),
        newType: 'error',
      });
    }
  }, [
    editingComponent.id,
    selectedComponentType,
    componentData,
    baseComponentData,
    updateContentComponent,
    editableCourseSection,
    courseId,
    sectionId,
    itemId,
    closeEditModal,
    setToasterVisibility,
    t,
  ]);

  const deleteComponent = useCallback(async () => {
    if (!componentToDelete) return;

    await deleteContentComponent({
      variables: {
        componentId: componentToDelete.id,
        componentType: componentToDelete.type,
      },
      onCompleted(res) {
        if (res.deleteContentComponent?.success) {
          closeDeleteModal();
          setComponentItems((prev) =>
            prev.filter((item) => item.component_id !== componentToDelete.id),
          );
          setToasterVisibility({
            newDuration: 5000,
            newText: t('contentComponent.deletedSuccessfully'),
            newType: 'success',
          });
        } else {
          setToasterVisibility({
            newDuration: 5000,
            newText: t('error.message'),
            newType: 'error',
          });
        }
      },
      update(cache, res) {
        if (res.data?.deleteContentComponent?.success) {
          const existingCourseQuery = cache.readQuery<EditableCourseSectionQuery>({
            query: EditableCourseSectionDocument,
            variables: { id: courseId },
          });

          if (existingCourseQuery?.editableCourse && courseId) {
            cache.writeQuery({
              query: EditableCourseSectionDocument,
              variables: { id: courseId },
              data: {
                __typename: 'Query',
                editableCourse: {
                  ...existingCourseQuery.editableCourse,
                  sections: existingCourseQuery.editableCourse.sections.map((s) => ({
                    ...s,
                    items: s.items.map((item) =>
                      item.__typename === 'Lesson'
                        ? {
                            ...item,
                            components: item.components.filter(
                              (component) => component.component_id !== componentToDelete.id,
                            ),
                          }
                        : item,
                    ),
                  })),
                },
              },
            });
          }
        }
      },
    });
  }, [
    componentToDelete,
    deleteContentComponent,
    closeDeleteModal,
    setToasterVisibility,
    t,
    courseId,
  ]);

  const handleDragEnd = useCallback(
    async (event: DragEndEvent) => {
      const { active, over } = event;

      if (active.id !== over?.id) {
        setComponentItems((item) => {
          const oldIndex = item.findIndex((i) => i.component_id === active.id);
          const newIndex = item.findIndex((i) => i.component_id === over?.id);
          const reordered = arrayMove(item, oldIndex, newIndex);

          updateContentComponentRanks({
            variables: {
              componentRanks: reordered.map((component, idx) => ({
                id: component.component_id,
                rank: idx + 1,
              })),
            },
          });

          return reordered;
        });
      }
    },
    [updateContentComponentRanks],
  );

  const contextValue: ComponentContextState = useMemo(
    () => ({
      componentItems,
      setComponentItems,

      isCreateModalOpen,
      isEditModalOpen,
      isDeleteModalOpen,

      selectedComponentType,
      editingComponent,
      componentToDelete,

      baseComponentData,
      componentData,

      openCreateModal,
      closeCreateModal,
      openEditModal,
      closeEditModal,
      openDeleteModal,
      closeDeleteModal,

      setSelectedComponentType,
      updateBaseComponentData,
      updateComponentData,
      resetComponentData,

      createComponent,
      isCreateingComponent,
      updateComponent,
      isUpdatingComponent,
      deleteComponent,
      handleDragEnd,

      getAvailableComponents,
    }),
    [
      baseComponentData,
      closeCreateModal,
      closeDeleteModal,
      closeEditModal,
      componentData,
      componentItems,
      componentToDelete,
      createComponent,
      isCreateingComponent,
      deleteComponent,
      editingComponent,
      getAvailableComponents,
      handleDragEnd,
      isCreateModalOpen,
      isDeleteModalOpen,
      isEditModalOpen,
      openCreateModal,
      openDeleteModal,
      openEditModal,
      resetComponentData,
      selectedComponentType,
      updateBaseComponentData,
      updateComponent,
      isUpdatingComponent,
      updateComponentData,
    ],
  );

  return <ComponentContext.Provider value={contextValue}>{children}</ComponentContext.Provider>;
};

export default ComponentProvider;
