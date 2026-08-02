import type { ComponentType as ReactComponentType } from 'react';
import type {
  AudioContentInput,
  ComponentType as ComponentTypeEnum,
  ContentComponent,
  DocumentContentInput,
  EmbedContentInput,
  ImageContentInput,
  TextContentInput,
  VideoContentInput,
  YouTubeContentInput,
} from '@/generated/graphql';

export type BaseComponentDataType = {
  denomination: string;
  isPublished: boolean;
  isRequired: boolean;
};

export type ContentComponentPayload = {
  textContent?: TextContentInput;
  videoContent?: VideoContentInput;
  youtubeContent?: YouTubeContentInput;
  audioContent?: AudioContentInput;
  documentContent?: DocumentContentInput;
  embedContent?: EmbedContentInput;
  imageContent?: ImageContentInput;
};

export type FormFieldsProps = {
  value: Partial<ContentComponent> | null;
  onChange: (data: Partial<ContentComponent>) => void;
};

export type ViewProps = {
  component: ContentComponent;
};

export type ContentComponentConfig = {
  id: ContentComponent['__typename'];
  label: string;
  type: ComponentTypeEnum;
  validation: (data: Partial<ContentComponent> | null, base: BaseComponentDataType) => boolean;
  createPayload: (data: Partial<ContentComponent>) => ContentComponentPayload;
  buildEditData: (component: ContentComponent) => Partial<ContentComponent>;
  FormFields: ReactComponentType<FormFieldsProps>;
  View: ReactComponentType<ViewProps>;
};
