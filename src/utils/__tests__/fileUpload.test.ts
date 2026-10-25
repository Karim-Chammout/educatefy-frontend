import { describe, expect, it } from 'vitest';

import { isFileTooLargeError } from '../fileUpload';

describe('isFileTooLargeError', () => {
  it('detects a 413 status on the error itself', () => {
    expect(isFileTooLargeError({ status: 413 })).toBe(true);
  });

  it('detects a 413 status on the axios response', () => {
    expect(isFileTooLargeError({ response: { status: 413 } })).toBe(true);
  });

  it('returns false for other statuses', () => {
    expect(isFileTooLargeError({ status: 500 })).toBe(false);
    expect(isFileTooLargeError({ response: { status: 500 } })).toBe(false);
    expect(isFileTooLargeError({})).toBe(false);
  });

  it.each([null, undefined, 'too large', 413])('returns false for non-object %s', (value) => {
    expect(isFileTooLargeError(value)).toBe(false);
  });
});
