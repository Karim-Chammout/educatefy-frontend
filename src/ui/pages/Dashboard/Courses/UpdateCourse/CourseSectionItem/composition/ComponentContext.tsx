import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import api from '@/api';
import {
  ComponentParentType,
  ComponentType,
  ContentComponent,
  EditableCourseSectionDocument,
  EditableCourseSectionQuery,
  SectionFragment,
  useCreateContentComponentMutation,
  useDeleteContentComponentMutation,
  useEditableCourseSectionLazyQuery,
  useUpdateContentComponentMutation,
  useUpdateContentComponentRanksMutation,
  VideoContent,
} from '@/generated/graphql';
import { FileResponseType } from '@/types/types';
import { ToasterContext } from '@/ui/context';
import { BaseComponentDataType, COMPONENT_REGISTRY, ComponentConfig } from './componentRegistry';

type ContentComponentType = SectionFragment['items'][0]['components'];

export type VideoContentType = VideoContent & { isUploading: boolean };

type ComponentContextState = {
  componentItems: ContentComponentType;
  setComponentItems: (items: ContentComponentType) => void;

  isCreateModalOpen: boolean;
  isEditModalOpen: boolean;
  isDeleteModalOpen: boolean;

  selectedComponentType: ComponentConfig | null;
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

  setSelectedComponentType: (config: ComponentConfig | null) => void;
  updateBaseComponentData: (data: Partial<BaseComponentDataType>) => void;
  updateComponentData: (data: Partial<ContentComponent>) => void;
  resetComponentData: () => void;

  createComponent: () => Promise<void>;
  updateComponent: () => Promise<void>;
  deleteComponent: () => Promise<void>;
  moveComponent: (dragIndex: number, hoverIndex: number) => void;
  handleDragEnd: () => Promise<void>;

  getAvailableComponents: () => ComponentConfig[];
  getComponentConfig: (componentType: string) => ComponentConfig | undefined;

  uploadVideo: (files: File[]) => Promise<string | null>;
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

  const [selectedComponentType, setSelectedComponentType] = useState<ComponentConfig | null>(null);
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

  const [deleteContentComponent] = useDeleteContentComponentMutation();
  const [updateContentComponentRanks] = useUpdateContentComponentRanksMutation();
  const [updateContentComponent] = useUpdateContentComponentMutation();
  const [createContentComponent] = useCreateContentComponentMutation();
  const [editableCourseSection] = useEditableCourseSectionLazyQuery();

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
    return COMPONENT_REGISTRY.map((config) => ({
      ...config,
      label: t(`sectionItem.${config.label}Option`),
    }));
  }, [t]);

  const getComponentConfig = useCallback((componentType: string) => {
    return COMPONENT_REGISTRY.find((config) => config.id === componentType);
  }, []);

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

      setBaseComponentData({
        denomination: component.denomination,
        isPublished: component.is_published,
        isRequired: component.is_required,
      });

      switch (component.__typename) {
        case 'TextContent':
          setComponentData({ content: component.content });
          setSelectedComponentType(getComponentConfig('TextContent') || null);
          break;
        case 'VideoContent':
          setComponentData({ url: component.url });
          setSelectedComponentType(getComponentConfig('VideoContent') || null);
          break;
        case 'YouTubeContent':
          setComponentData({ youtube_video_id: component.youtube_video_id });
          setSelectedComponentType(getComponentConfig('YouTubeContent') || null);
          break;
        default:
          throw new Error('Unsupported component type');
      }

      setEditingComponent({ id: componentId, isEditing: true });
      setIsEditModalOpen(true);
    },
    [componentItems, getComponentConfig],
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

  const uploadVideo = useCallback(
    async (files: File[]): Promise<string | null> => {
      if (files.length === 0) return null;

      try {
        updateComponentData({ isUploading: true } as VideoContentType);

        const formData = new FormData();
        formData.append('file', files[0]);
        formData.append('destinationFolder', 'course-components');

        const uploadedVideo = await api.post<FileResponseType>('/api/file/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        if (uploadedVideo.success) {
          updateComponentData({
            url: uploadedVideo.filePath,
            isUploading: false,
          } as Partial<VideoContent>);

          return uploadedVideo.filePath;
        }
      } catch (_error) {
        setToasterVisibility({
          newDuration: 5000,
          newText: t('error.message'),
          newType: 'error',
        });
        updateComponentData({ isUploading: false } as VideoContentType);
      }

      return null;
    },
    [updateComponentData, setToasterVisibility, t],
  );

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
              fetchPolicy: 'network-only',
            });

            const courseSection = refetchResult.data?.editableCourse?.sections.find(
              (section) => section.id === sectionId,
            );

            if (courseSection) {
              const courseSectionItem = courseSection.items.find((item) => item.itemId === itemId);
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

          if (existingCourseQuery?.editableCourse) {
            cache.writeQuery({
              query: EditableCourseSectionDocument,
              variables: { id: courseId },
              data: {
                editableCourse: {
                  ...existingCourseQuery.editableCourse,
                  sections: existingCourseQuery.editableCourse.sections.map((s) => ({
                    ...s,
                    items: s.items.map((item) => ({
                      ...item,
                      components: item.components.filter(
                        (component) => component.component_id !== componentToDelete.id,
                      ),
                    })),
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

  const moveComponent = useCallback((dragIndex: number, hoverIndex: number) => {
    setComponentItems((prevItems) => {
      const newComponentItems = [...prevItems];
      const [removed] = newComponentItems.splice(dragIndex, 1);
      newComponentItems.splice(hoverIndex, 0, removed);

      return newComponentItems.map((componentItem, index) => ({
        ...componentItem,
        rank: index + 1,
      }));
    });
  }, []);

  const handleDragEnd = useCallback(async () => {
    const updates = componentItems.map((item, index) => ({
      id: item.component_id,
      rank: index + 1,
    }));

    await updateContentComponentRanks({
      variables: { componentRanks: updates },
    });
  }, [componentItems, updateContentComponentRanks]);

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
      updateComponent,
      deleteComponent,
      moveComponent,
      handleDragEnd,

      getAvailableComponents,
      getComponentConfig,

      uploadVideo,
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
      deleteComponent,
      editingComponent,
      getAvailableComponents,
      getComponentConfig,
      handleDragEnd,
      isCreateModalOpen,
      isDeleteModalOpen,
      isEditModalOpen,
      moveComponent,
      openCreateModal,
      openDeleteModal,
      openEditModal,
      resetComponentData,
      selectedComponentType,
      updateBaseComponentData,
      updateComponent,
      updateComponentData,
      uploadVideo,
    ],
  );

  return <ComponentContext.Provider value={contextValue}>{children}</ComponentContext.Provider>;
};

export default ComponentProvider;
