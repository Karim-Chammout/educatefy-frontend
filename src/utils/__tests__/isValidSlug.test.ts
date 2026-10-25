import { describe, expect, it } from 'vitest';

import { isValidSlug } from '../isValidSlug';

describe('isValidSlug', () => {
  it.each(['course-101', 'ab', 'course_101', 'a1-_b2'])('accepts valid slug %s', (slug) => {
    expect(isValidSlug(slug)).toBe(true);
  });

  it.each(['', 'a', 'A', 'Course-101', '-ab', 'ab-', 'ab_', 'a b', 'a/b', 'slug!'])(
    'rejects invalid slug %s',
    (slug) => {
      expect(isValidSlug(slug)).toBe(false);
    },
  );
});
