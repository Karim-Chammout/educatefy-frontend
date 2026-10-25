import {
  AudioContent,
  DocumentContent,
  EmbedContent,
  ImageContent,
  TextContent,
  VideoContent,
  YouTubeContent,
} from '@/generated/graphql';

export type FileResponseType =
  | {
      success: true;
      uuid: string;
      filePath: string;
      originalFileName: string;
      mimeType: string;
      fileSize: number;
    }
  | {
      success: false;
      message: string;
    };

export type ContentComponentsType =
  | TextContent
  | VideoContent
  | YouTubeContent
  | AudioContent
  | DocumentContent
  | EmbedContent
  | ImageContent;

/** Error messages the backend returns verbatim in mutation `errors[].message`. */
export enum ServerErrorType {
  SLUG_ALREADY_TAKEN = 'SLUG_ALREADY_TAKEN',
  MIN_CONTENT_SUBJECTS_REQUIRED = 'MIN_CONTENT_SUBJECTS_REQUIRED',
  INVALID_SUBJECTS = 'INVALID_SUBJECTS',
}
