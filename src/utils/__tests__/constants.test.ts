import { describe, expect, it } from 'vitest';

import {
  ACCESS_DENIED,
  MUST_ENROLL_TO_COURSE_FIRST,
  PERMISSION_DENIED,
  SIGN_UP_FIRST,
} from '../constants';

describe('error constants', () => {
  it('exposes the backend error codes', () => {
    expect(ACCESS_DENIED).toBe('ACCESS_DENIED');
    expect(PERMISSION_DENIED).toBe('PERMISSION_DENIED');
    expect(MUST_ENROLL_TO_COURSE_FIRST).toBe('MUST_ENROLL_TO_COURSE_FIRST');
    expect(SIGN_UP_FIRST).toBe('SIGN_UP_FIRST');
  });
});
