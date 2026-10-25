import { afterEach, describe, expect, it, vi } from 'vitest';

import { renderWithProviders, screen } from '@/test/wrappers';
import type { ContentComponentsType } from '@/types/types';

import ContentRenderer from './ContentRenderer';

const richContent = {
  type: 'doc',
  content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Lesson intro' }] }],
};

describe('ContentRenderer', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('renders text content as rich text', () => {
    const { container } = renderWithProviders(
      <ContentRenderer component={{ __typename: 'TextContent', content: richContent }} />,
    );

    expect(screen.getByText('Lesson intro')).toBeVisible();
    expect(container).not.toBeEmptyDOMElement();
  });

  it('renders video content with the bucket media url', () => {
    vi.stubEnv('VITE_S3_PATH_PREFIX', 'https://cdn.test/storage');
    vi.stubEnv('VITE_S3_BUCKET_NAME', 'bucket');

    renderWithProviders(
      <ContentRenderer component={{ __typename: 'VideoContent', url: 'courses/1/v.mp4' }} />,
    );

    const source = document.querySelector('video source');

    expect(source?.getAttribute('src')).toBe('https://cdn.test/storage/bucket/courses/1/v.mp4');
  });

  it('renders nothing for empty content', () => {
    const { container } = renderWithProviders(
      <ContentRenderer component={{ __typename: 'TextContent', content: null }} />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing for unknown component types', () => {
    const unknown = { __typename: 'FutureContent' } as unknown as Partial<ContentComponentsType>;
    const { container } = renderWithProviders(<ContentRenderer component={unknown} />);

    expect(container).toBeEmptyDOMElement();
  });
});
