import {
  AudioContent,
  ComponentType as ComponentTypeEnum,
  DocumentContent,
  EmbedContent,
  ImageContent,
  TextContent,
  VideoContent,
  YouTubeContent,
} from '@/generated/graphql';
import { hasRichTextContent } from '@/utils/hasRichTextContent';

import { AudioContentFormFields } from './forms/AudioContentFormFields';
import { DocumentContentFormFields } from './forms/DocumentContentFormFields';
import { EmbedContentFormFields } from './forms/EmbedContentFormFields';
import { ImageContentFormFields } from './forms/ImageContentFormFields';
import { TextContentFormFields } from './forms/TextContentFormFields';
import { VideoContentFormFields } from './forms/VideoContentFormFields';
import { YouTubeContentFormFields } from './forms/YouTubeContentFormFields';
import { ContentComponentConfig } from './types';
import { AudioContentView } from './views/AudioContentView';
import { DocumentContentView } from './views/DocumentContentView';
import { EmbedContentView } from './views/EmbedContentView';
import { ImageContentView } from './views/ImageContentView';
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
  {
    id: 'AudioContent',
    label: 'audioComponent',
    type: ComponentTypeEnum.Audio,
    validation: (data, base) => {
      const audioData = data as Partial<AudioContent> | null;

      return !!base.denomination && !!audioData?.url;
    },
    createPayload: (data) => ({
      audioContent: {
        url: (data as Partial<AudioContent> | null)?.url || '',
        originalName: (data as Partial<AudioContent> | null)?.original_name || undefined,
        mimeType: (data as Partial<AudioContent> | null)?.mime_type || undefined,
      },
    }),
    buildEditData: (component) => ({
      url: (component as AudioContent).url,
      original_name: (component as AudioContent).original_name,
      mime_type: (component as AudioContent).mime_type,
    }),
    FormFields: AudioContentFormFields,
    View: AudioContentView,
  },
  {
    id: 'DocumentContent',
    label: 'documentComponent',
    type: ComponentTypeEnum.Document,
    validation: (data, base) => {
      const documentData = data as Partial<DocumentContent> | null;

      return !!base.denomination && !!documentData?.url;
    },
    createPayload: (data) => ({
      documentContent: {
        url: (data as Partial<DocumentContent> | null)?.url || '',
        originalName: (data as Partial<DocumentContent> | null)?.original_name || undefined,
        mimeType: (data as Partial<DocumentContent> | null)?.mime_type || undefined,
      },
    }),
    buildEditData: (component) => ({
      url: (component as DocumentContent).url,
      original_name: (component as DocumentContent).original_name,
      mime_type: (component as DocumentContent).mime_type,
    }),
    FormFields: DocumentContentFormFields,
    View: DocumentContentView,
  },
  {
    id: 'EmbedContent',
    label: 'embedComponent',
    type: ComponentTypeEnum.Embed,
    validation: (data, base) => {
      const embedData = data as Partial<EmbedContent> | null;

      return !!base.denomination && !!embedData?.provider && !!embedData?.url;
    },
    createPayload: (data) => ({
      embedContent: {
        provider: (data as Partial<EmbedContent> | null)?.provider || '',
        url: (data as Partial<EmbedContent> | null)?.url || '',
      },
    }),
    buildEditData: (component) => ({
      provider: (component as EmbedContent).provider,
      url: (component as EmbedContent).url,
    }),
    FormFields: EmbedContentFormFields,
    View: EmbedContentView,
  },
  {
    id: 'ImageContent',
    label: 'imageComponent',
    type: ComponentTypeEnum.Image,
    validation: (data, base) => {
      const imageData = data as Partial<ImageContent> | null;

      return !!base.denomination && !!imageData?.url;
    },
    createPayload: (data) => ({
      imageContent: {
        url: (data as Partial<ImageContent> | null)?.url || '',
        originalName: (data as Partial<ImageContent> | null)?.original_name || undefined,
        mimeType: (data as Partial<ImageContent> | null)?.mime_type || undefined,
        altText: (data as Partial<ImageContent> | null)?.alt_text || undefined,
        caption: (data as Partial<ImageContent> | null)?.caption || undefined,
      },
    }),
    buildEditData: (component) => ({
      url: (component as ImageContent).url,
      original_name: (component as ImageContent).original_name,
      mime_type: (component as ImageContent).mime_type,
      alt_text: (component as ImageContent).alt_text,
      caption: (component as ImageContent).caption,
    }),
    FormFields: ImageContentFormFields,
    View: ImageContentView,
  },
];

export const getContentComponentConfig = (type: string) =>
  CONTENT_COMPONENT_REGISTRY.find((config) => config.id === type);
