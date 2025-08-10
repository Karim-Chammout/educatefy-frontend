import { useCallback, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  ComponentType,
  EditableCourseSectionDocument,
  EditableCourseSectionQuery,
  SectionFragment,
  useDeleteContentComponentMutation,
  useEditableCourseSectionLazyQuery,
  useUpdateContentComponentMutation,
  useUpdateContentComponentRanksMutation,
} from '@/generated/graphql';
import { ToasterContext } from '@/ui/context';

type ContentComponentType = SectionFragment['items'][0]['components'];

const useComponentManagement = (
  contentComponents: ContentComponentType,
  courseId?: string,
  sectionId?: string,
  itemId?: string,
) => {
  const { t } = useTranslation();
  const { setToasterVisibility } = useContext(ToasterContext);

  const [componentItems, setComponentItems] = useState(contentComponents);
  const [isCreateItemModalOpen, setIsCreateItemModalOpen] = useState(false);
  const [componentType, setComponentType] = useState<{ id: string; label: string } | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingComponent, setEditingComponent] = useState<{
    id: null | string;
    isEditing: boolean;
  }>({
    id: null,
    isEditing: false,
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [componentItemToDelete, setComponentItemToDelete] = useState<{
    id: string;
    type: ComponentType;
  } | null>(null);

  const [deleteContentComponent] = useDeleteContentComponentMutation();
  const [updateContentComponentRanks] = useUpdateContentComponentRanksMutation();
  const [updateContentComponent] = useUpdateContentComponentMutation();
  const [editableCourseSection] = useEditableCourseSectionLazyQuery();

  const moveComponentItem = useCallback((dragIndex: number, hoverIndex: number) => {
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
      variables: {
        componentRanks: updates,
      },
    });
  }, [componentItems, updateContentComponentRanks]);

  const handleCloseModal = () => {
    setIsCreateItemModalOpen(false);
    setComponentType(null);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setComponentItemToDelete(null);
  };

  const handleEdit = (componentId: string) => {
    setEditingComponent({ id: componentId, isEditing: true });
    setIsEditModalOpen(true);
  };

  const resetForm = () => {
    setIsEditModalOpen(false);
    setEditingComponent({ id: null, isEditing: false });
  };

  const handleDeleteComponent = async () => {
    if (!componentItemToDelete) return;

    await deleteContentComponent({
      variables: {
        componentId: componentItemToDelete.id,
        componentType: componentItemToDelete.type,
      },
      onCompleted(res) {
        if (res.deleteContentComponent?.success) {
          handleCloseDeleteModal();

          setComponentItems((prevItems) =>
            prevItems.filter((item) => item.component_id !== componentItemToDelete.id),
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

          if (!existingCourseQuery?.editableCourse) return;

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
                      (component) => component.component_id !== componentItemToDelete.id,
                    ),
                  })),
                })),
              },
            },
          });
        }
      },
    });
  };

  const handleEditComponent = async (componentId: string, updatedData: any) => {
    if (!updatedData) return;

    try {
      await updateContentComponent({
        variables: {
          baseComponentInfo: {
            id: componentId,
            denomination: updatedData.denomination,
            isPublished: updatedData.isPublished,
            type: updatedData.type,
            isRequired: updatedData.isRequired,
          },
          textContent: updatedData.textContent
            ? { content: updatedData.textContent.content }
            : null,
          videoContent: updatedData.videoContent ? { url: updatedData.videoContent.url } : null,
          youtubeContent: updatedData.youtubeContent
            ? { videoId: updatedData.youtubeContent.videoId }
            : null,
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

            if (!courseSection) return;

            const courseSectionItem = courseSection.items.find((item) => item.itemId === itemId);

            if (!courseSectionItem) return;

            setComponentItems(courseSectionItem.components);

            resetForm();

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
  };

  return {
    componentItems,
    setComponentItems,
    setComponentItemToDelete,
    isCreateItemModalOpen,
    setIsCreateItemModalOpen,
    setIsDeleteModalOpen,
    isDeleteModalOpen,
    isEditModalOpen,
    componentType,
    setComponentType,
    editingComponent,
    handleCloseModal,
    handleCloseDeleteModal,
    handleEdit,
    resetForm,
    moveComponentItem,
    handleDragEnd,
    handleDeleteComponent,
    handleEditComponent,
  };
};

export default useComponentManagement;
