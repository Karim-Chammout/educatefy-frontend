import { afterEach, describe, expect, it, vi } from 'vitest';

import { getMediaUrl } from '../getMediaUrl';

describe('getMediaUrl', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('prefixes the key with the configured bucket path', () => {
    vi.stubEnv('VITE_S3_PATH_PREFIX', 'https://cdn.test/storage');
    vi.stubEnv('VITE_S3_BUCKET_NAME', 'bucket');

    expect(getMediaUrl('courses/1/cover.png')).toBe(
      'https://cdn.test/storage/bucket/courses/1/cover.png',
    );
  });
});
