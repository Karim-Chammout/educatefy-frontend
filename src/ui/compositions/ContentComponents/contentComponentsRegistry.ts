import {
  ComponentType as ComponentTypeEnum,
  TextContent,
  VideoContent,
  YouTubeContent,
} from '@/generated/graphql';
import { hasRichTextContent } from '@/utils/hasRichTextContent';

import { TextContentFormFields } from './forms/TextContentFormFields';
import { VideoContentFormFields } from './forms/VideoContentFormFields';
import { YouTubeContentFormFields } from './forms/YouTubeContentFormFields';
import { ContentComponentConfig } from './types';
import { TextContentView } from './views/TextContentView';
import { VideoContentView } from './views/VideoContentView';
import { YouTubeContentView } from './views/YouTubeContentView';

/**
 * Content component registry - single source of truth for the frontend.
 *
 * Renders (views), edit forms, validation and GraphQL payload mapping for every
 * content component type live here. Both the student section renderer and the
 * dashboard component CRUD are driven by this registry.
 *
 * To add a new content component type:
 *   1. Create the GraphQL view component (student rendering) under `views/`.
 *   2. Create the edit form fields under `forms/`.
 *   3. Register the type below (view, form, validation, payload mapping,
 *      `buildEditData` for populating the edit modal).
 *   4. Add translation keys.
 */

export const CONTENT_COMPONENT_REGISTRY: ContentComponentConfig[] = [
  {
    id: 'TextContent',
    label: 'textComponent',
    type: ComponentTypeEnum.Text,
    validation: (data, base) => {
      const textData = data as Partial<TextContent> | null;

      return !!base.denomination && !!hasRichTextContent(textData?.content);
    },
    createPayload: (data) => ({
      textContent: { content: (data as Partial<TextContent> | null)?.content },
    }),
    buildEditData: (component) => ({ content: (component as TextContent).content }),
    FormFields: TextContentFormFields,
    View: TextContentView,
  },
  {
    id: 'VideoContent',
    label: 'videoComponent',
    type: ComponentTypeEnum.Video,
    validation: (data, base) => {
      const videoData = data as Partial<VideoContent> | null;

      return !!base.denomination && !!videoData?.url;
    },
    createPayload: (data) => ({
      videoContent: { url: (data as Partial<VideoContent> | null)?.url || '' },
    }),
    buildEditData: (component) => ({ url: (component as VideoContent).url }),
    FormFields: VideoContentFormFields,
    View: VideoContentView,
  },
  {
    id: 'YouTubeContent',
    label: 'youtubeVideoComponent',
    type: ComponentTypeEnum.Youtube,
    validation: (data, base) => {
      const youtubeData = data as Partial<YouTubeContent> | null;

      return !!base.denomination && !!youtubeData?.youtube_video_id;
    },
    createPayload: (data) => ({
      youtubeContent: {
        videoId: (data as Partial<YouTubeContent> | null)?.youtube_video_id || '',
      },
    }),
    buildEditData: (component) => ({
      youtube_video_id: (component as YouTubeContent).youtube_video_id,
    }),
    FormFields: YouTubeContentFormFields,
    View: YouTubeContentView,
  },
];

export const getContentComponentConfig = (type: string) =>
  CONTENT_COMPONENT_REGISTRY.find((config) => config.id === type);
