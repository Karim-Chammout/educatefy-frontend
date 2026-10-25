import { describe, expect, it } from 'vitest';

import { getTeacherPath } from '../getTeacherPath';

describe('getTeacherPath', () => {
  it('builds the public teacher profile path', () => {
    expect(getTeacherPath('42')).toBe('/teacher/42');
  });
});
