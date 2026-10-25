import { describe, expect, it } from 'vitest';

import { max, min } from '../mediaQuery';

describe('mediaQuery', () => {
  it('builds a min-width query for the breakpoint', () => {
    // md = 990px -> (990 + 1) / 16 em
    expect(min('md', 'color: red;').styles).toContain('@media screen and (min-width: 61.9375em)');
  });

  it('builds a max-width query for the breakpoint', () => {
    // sm = 768px -> 768 / 16 em
    expect(max('sm', 'color: blue;').styles).toContain('@media screen and (max-width: 48em)');
  });
});
