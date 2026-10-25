import { describe, expect, it } from 'vitest';

import { isValidUrl } from '../isValidUrl';

describe('isValidUrl', () => {
  it.each(['https://example.com', 'http://example.com/path?q=1', 'https://sub.example.co/course'])(
    'accepts valid url %s',
    (url) => {
      expect(isValidUrl(url)).toBe(true);
    },
  );

  it.each([
    '',
    'not-a-url',
    'ftp://example.com/file',
    'https://',
    'https://example',
    'http://localhost:3000',
  ])('rejects invalid url %s', (url) => {
    expect(isValidUrl(url)).toBe(false);
  });
});
