import { afterEach, describe, expect, it, vi } from 'vitest';

import { getS3FilePathFromUrl } from '../s3';

describe('getS3FilePathFromUrl', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('extracts the file path from a bucket url', () => {
    vi.stubEnv('VITE_S3_PATH_PREFIX', 'https://cdn.test/storage');
    vi.stubEnv('VITE_S3_BUCKET_NAME', 'bucket');

    expect(getS3FilePathFromUrl('https://cdn.test/storage/bucket/courses/1/cover.png')).toBe(
      'courses/1/cover.png',
    );
  });

  it('returns null for urls outside the bucket', () => {
    vi.stubEnv('VITE_S3_PATH_PREFIX', 'https://cdn.test/storage');
    vi.stubEnv('VITE_S3_BUCKET_NAME', 'bucket');

    expect(getS3FilePathFromUrl('https://other.test/file.png')).toBe(null);
    expect(getS3FilePathFromUrl('https://cdn.test/storage/bucket')).toBe(null);
  });
});
