import {
  ComponentType,
  ContentComponent,
  TextContent,
  VideoContent,
  YouTubeContent,
} from '@/generated/graphql';
import { removeHtmlTags } from '@/utils/removeHTMLTags';

/**
 * Component Registry - Easy to extend with new component types
 *
 * To add a new component type:
 * 1. Add the component configuration here
 * 2. Create a corresponding form component in ComponentFormModal
 * 3. Add translation keys
 */

export type BaseComponentDataType = {
  denomination: string;
  isPublished: boolean;
  isRequired: boolean;
};

export type ComponentConfig = {
  id: string;
  label: string;
  type: ComponentType;
  validation: (data: ContentComponent, base: BaseComponentDataType) => boolean;
  createPayload: (data: Partial<ContentComponent>) => any;
};

export const COMPONENT_REGISTRY: ComponentConfig[] = [
  {
    id: 'TextContent',
    label: 'textComponent',
    type: ComponentType.Text,
    validation: (data: ContentComponent, base: BaseComponentDataType) => {
      const textData = data as TextContent;

      return (
        !!base.denomination && !!textData.content?.trim() && !!removeHtmlTags(textData.content)
      );
    },
    createPayload: (data: Partial<ContentComponent>) => ({
      textContent: { content: (data as TextContent).content },
    }),
  },
  {
    id: 'VideoContent',
    label: 'videoComponent',
    type: ComponentType.Video,
    validation: (data: ContentComponent, base: BaseComponentDataType) => {
      const videoData = data as VideoContent;

      return !!base.denomination && !!videoData.url;
    },
    createPayload: (data: Partial<ContentComponent>) => ({
      videoContent: { url: (data as VideoContent).url },
    }),
  },
  {
    id: 'YouTubeContent',
    label: 'youtubeVideoComponent',
    type: ComponentType.Youtube,
    validation: (data: ContentComponent, base: BaseComponentDataType) => {
      const youtubeData = data as YouTubeContent;

      return !!base.denomination && !!youtubeData.youtube_video_id;
    },
    createPayload: (data: Partial<ContentComponent>) => ({
      youtubeContent: { videoId: (data as YouTubeContent).youtube_video_id },
    }),
  },
];
