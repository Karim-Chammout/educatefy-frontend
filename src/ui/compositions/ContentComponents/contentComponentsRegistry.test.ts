import { describe, expect, it } from 'vitest';

import {
  ComponentType,
  type AudioContent,
  type DocumentContent,
  type EmbedContent,
  type ImageContent,
  type TextContent,
  type VideoContent,
  type YouTubeContent,
} from '@/generated/graphql';

import { CONTENT_COMPONENT_REGISTRY, getContentComponentConfig } from './contentComponentsRegistry';

const base = { denomination: 'Lesson part', isPublished: true, isRequired: false };
const blankBase = { ...base, denomination: '' };

const richContent = {
  type: 'doc',
  content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Hello' }] }],
};

describe('CONTENT_COMPONENT_REGISTRY', () => {
  it('covers all seven component types with unique ids', () => {
    const types = CONTENT_COMPONENT_REGISTRY.map((config) => config.type).sort();

    expect(types).toEqual([...Object.values(ComponentType)].sort());

    const ids = CONTENT_COMPONENT_REGISTRY.map((config) => config.id);

    expect(new Set(ids).size).toBe(CONTENT_COMPONENT_REGISTRY.length);
  });

  it('exposes a form and a view for every type', () => {
    CONTENT_COMPONENT_REGISTRY.forEach((config) => {
      expect(config.FormFields).toBeDefined();
      expect(config.View).toBeDefined();
    });
  });
});

describe('getContentComponentConfig', () => {
  it('resolves known ids and returns undefined for unknown ids', () => {
    expect(getContentComponentConfig('TextContent')?.type).toBe(ComponentType.Text);
    expect(getContentComponentConfig('ImageContent')?.type).toBe(ComponentType.Image);
    expect(getContentComponentConfig('Unknown')).toBe(undefined);
  });
});

describe('registry validation and payloads', () => {
  it('handles text content with rich-text validation', () => {
    const config = getContentComponentConfig('TextContent');

    expect(config?.validation({ content: richContent }, base)).toBe(true);
    expect(config?.validation({ content: null }, base)).toBe(false);
    expect(config?.validation({ content: richContent }, blankBase)).toBe(false);
    expect(config?.createPayload({ content: richContent })).toEqual({
      textContent: { content: richContent },
    });
    expect(
      config?.buildEditData({ __typename: 'TextContent', content: richContent } as TextContent),
    ).toEqual({ content: richContent });
  });

  it('handles video content keyed by url', () => {
    const config = getContentComponentConfig('VideoContent');

    expect(config?.validation({ url: 'https://cdn.test/v.mp4' }, base)).toBe(true);
    expect(config?.validation({}, base)).toBe(false);
    expect(config?.createPayload({ url: 'https://cdn.test/v.mp4' })).toEqual({
      videoContent: { url: 'https://cdn.test/v.mp4' },
    });
    expect(
      config?.buildEditData({
        __typename: 'VideoContent',
        url: 'https://cdn.test/v.mp4',
      } as VideoContent),
    ).toEqual({ url: 'https://cdn.test/v.mp4' });
  });

  it('maps youtube_video_id to the videoId payload field', () => {
    const config = getContentComponentConfig('YouTubeContent');

    expect(config?.validation({ youtube_video_id: 'abc123' }, base)).toBe(true);
    expect(config?.validation({}, base)).toBe(false);
    expect(config?.createPayload({ youtube_video_id: 'abc123' })).toEqual({
      youtubeContent: { videoId: 'abc123' },
    });
    expect(
      config?.buildEditData({
        __typename: 'YouTubeContent',
        youtube_video_id: 'abc123',
      } as YouTubeContent),
    ).toEqual({ youtube_video_id: 'abc123' });
  });

  it('handles audio content with file metadata', () => {
    const config = getContentComponentConfig('AudioContent');
    const component = {
      __typename: 'AudioContent',
      url: 'https://cdn.test/a.mp3',
      original_name: 'lecture.mp3',
      mime_type: 'audio/mpeg',
    } as AudioContent;

    expect(config?.validation({ url: component.url }, base)).toBe(true);
    expect(config?.validation({}, base)).toBe(false);
    expect(config?.createPayload(component)).toEqual({
      audioContent: {
        url: 'https://cdn.test/a.mp3',
        originalName: 'lecture.mp3',
        mimeType: 'audio/mpeg',
      },
    });
    expect(config?.buildEditData(component)).toEqual({
      url: 'https://cdn.test/a.mp3',
      original_name: 'lecture.mp3',
      mime_type: 'audio/mpeg',
    });
  });

  it('handles document content with file metadata', () => {
    const config = getContentComponentConfig('DocumentContent');
    const component = {
      __typename: 'DocumentContent',
      url: 'https://cdn.test/d.pdf',
      original_name: 'notes.pdf',
      mime_type: 'application/pdf',
    } as DocumentContent;

    expect(config?.validation({ url: component.url }, base)).toBe(true);
    expect(config?.validation({}, base)).toBe(false);
    expect(config?.createPayload(component)).toEqual({
      documentContent: {
        url: 'https://cdn.test/d.pdf',
        originalName: 'notes.pdf',
        mimeType: 'application/pdf',
      },
    });
    expect(config?.buildEditData(component)).toEqual({
      url: 'https://cdn.test/d.pdf',
      original_name: 'notes.pdf',
      mime_type: 'application/pdf',
    });
  });

  it('requires both provider and url for embed content', () => {
    const config = getContentComponentConfig('EmbedContent');
    const component = {
      __typename: 'EmbedContent',
      provider: 'spotify',
      url: 'https://open.spotify.com/embed/x',
    } as EmbedContent;

    expect(config?.validation(component, base)).toBe(true);
    expect(config?.validation({ url: component.url }, base)).toBe(false);
    expect(config?.validation({ provider: 'spotify' }, base)).toBe(false);
    expect(config?.createPayload(component)).toEqual({
      embedContent: { provider: 'spotify', url: 'https://open.spotify.com/embed/x' },
    });
    expect(config?.buildEditData(component)).toEqual({
      provider: 'spotify',
      url: 'https://open.spotify.com/embed/x',
    });
  });

  it('handles image content with alt text and caption', () => {
    const config = getContentComponentConfig('ImageContent');
    const component = {
      __typename: 'ImageContent',
      url: 'https://cdn.test/i.png',
      original_name: 'diagram.png',
      mime_type: 'image/png',
      alt_text: 'A diagram',
      caption: 'Figure 1',
    } as ImageContent;

    expect(config?.validation({ url: component.url }, base)).toBe(true);
    expect(config?.validation({}, base)).toBe(false);
    expect(config?.createPayload(component)).toEqual({
      imageContent: {
        url: 'https://cdn.test/i.png',
        originalName: 'diagram.png',
        mimeType: 'image/png',
        altText: 'A diagram',
        caption: 'Figure 1',
      },
    });
    expect(config?.buildEditData(component)).toEqual({
      url: 'https://cdn.test/i.png',
      original_name: 'diagram.png',
      mime_type: 'image/png',
      alt_text: 'A diagram',
      caption: 'Figure 1',
    });
  });
});
