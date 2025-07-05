import DialogActions from '@mui/material/DialogActions';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import api from '@/api';
import {
  ComponentParentType,
  ComponentType,
  EditableLessonFragment,
  useCreateContentComponentMutation,
} from '@/generated/graphql';
import { FileResponseType } from '@/types/types';
import { Button } from '@/ui/components';
import { ToasterContext } from '@/ui/context';
import { removeHtmlTags } from '@/utils/removeHTMLTags';

import BaseContentComponent from './BaseContentComponent';
import ContentComponent from './ContentComponent';

type BaseComponentStateType = {
  denomination: string;
  isPublished: boolean;
  isRequired: boolean;
};

type ContentComponentType = EditableLessonFragment['components'][0];

const ComponentCreationForm = ({
  componentType,
  parentId,
  handleCloseModalCallback,
  setComponentItems,
  initialData,
  onSave,
}: {
  componentType: string;
  parentId: string;
  handleCloseModalCallback: () => void;
  setComponentItems: Dispatch<SetStateAction<EditableLessonFragment['components']>>;
  initialData?: ContentComponentType;
  onSave?: (updatedData: any) => void;
}) => {
  const { t } = useTranslation();
  const { setToasterVisibility } = useContext(ToasterContext);

  const [baseComponent, setBaseComponent] = useState<BaseComponentStateType>({
    denomination: initialData?.denomination ?? '',
    isPublished: initialData?.is_published ?? true,
    isRequired: initialData?.is_required ?? false,
  });

  const [textContent, setTextContent] = useState(
    (initialData?.__typename === 'TextContent' && initialData.content) || '',
  );
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState<null | string>(
    (initialData?.__typename === 'VideoContent' && initialData.url) || null,
  );

  const [createContentComponent] = useCreateContentComponentMutation();

  const handleBaseComponentUpdate = (value: Partial<BaseComponentStateType>) => {
    setBaseComponent((prev) => ({ ...prev, ...value }));
  };

  const onVideoSelected = async (files: File[]) => {
    if (files.length === 0) return;

    try {
      setIsUploadingVideo(true);
      const formData = new FormData();
      formData.append('file', files[0]);
      formData.append('destinationFolder', 'course-components');

      const uploadedVideo = await api.post<FileResponseType>('/api/file/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (uploadedVideo.success) {
        setUploadedVideoUrl(uploadedVideo.filePath);
      }
    } catch (_error) {
      setToasterVisibility({
        newDuration: 5000,
        newText: t('error.message'),
        newType: 'error',
      });
    }
    setIsUploadingVideo(false);
  };

  const getComponentType = () => {
    switch (componentType) {
      case 'TextContent':
        return ComponentType.Text;
      case 'VideoContent':
        return ComponentType.Video;
      default:
        throw new Error('Not supported component type');
    }
  };

  const handleCreateContentComponent = async () => {
    try {
      await createContentComponent({
        variables: {
          baseComponentInfo: {
            denomination: baseComponent.denomination,
            isPublished: baseComponent.isPublished,
            type: getComponentType(),
            isRequired: baseComponent.isRequired,
            parentType: ComponentParentType.Lesson,
            parentId,
          },
          textContent: textContent ? { content: textContent } : null,
          videoContent: uploadedVideoUrl ? { url: uploadedVideoUrl } : null,
        },
        onCompleted(res) {
          if (res.createContentComponent?.success) {
            const newComponent = res.createContentComponent.component;
            if (newComponent) {
              setComponentItems((prevItems) => [...prevItems, newComponent]);
            }
            handleCloseModalCallback();
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

  const handleSave = async () => {
    const updatedData = {
      denomination: baseComponent.denomination,
      isPublished: baseComponent.isPublished,
      isRequired: baseComponent.isRequired,
      textContent: textContent ? { content: textContent } : null,
      videoContent: uploadedVideoUrl ? { url: uploadedVideoUrl } : null,
      type: getComponentType(),
    };

    if (onSave) {
      onSave(updatedData);
    } else {
      await handleCreateContentComponent();
    }
  };

  const hasContent = removeHtmlTags(textContent);

  return (
    <div>
      <div style={{ margin: '16px 0' }}>
        <BaseContentComponent
          baseComponent={baseComponent}
          setBaseComponent={handleBaseComponentUpdate}
        />
        <ContentComponent
          type={componentType}
          textContent={textContent}
          setTextContent={setTextContent}
          onVideoSelected={onVideoSelected}
          isUploadingVideo={isUploadingVideo}
          videoUrl={uploadedVideoUrl}
        />
      </div>
      <DialogActions sx={{ padding: '8px 0 !important' }}>
        <Button onClick={handleCloseModalCallback} variant="outlined" fullWidth>
          {t('common.cancel')}
        </Button>
        <Button
          onClick={handleSave}
          disabled={
            !baseComponent.denomination ||
            (componentType === 'VideoContent' && !uploadedVideoUrl) ||
            (componentType === 'TextContent' && !hasContent)
          }
          fullWidth
        >
          {t('common.confirm')}
        </Button>
      </DialogActions>
    </div>
  );
};

export default ComponentCreationForm;
