import { describe, expect, it } from 'vitest';

import { isNumeric } from '../isNumeric';

describe('isNumeric', () => {
  it.each([5, 0, -3.5, '5', '5.5', '-3', ' 5 '])('treats %s as numeric', (value) => {
    expect(isNumeric(value)).toBe(true);
  });

  it.each(['abc', '12ab', 'NaN'])('treats %s as non-numeric', (value) => {
    expect(isNumeric(value)).toBe(false);
  });

  it('treats NaN as non-numeric', () => {
    expect(isNumeric(NaN)).toBe(false);
  });
});
