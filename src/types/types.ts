import { TextContent, VideoContent, YouTubeContent } from '@/generated/graphql';

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

export type ContentComponentsType = TextContent | VideoContent | YouTubeContent;
