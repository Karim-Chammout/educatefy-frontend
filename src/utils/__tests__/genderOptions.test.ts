import { describe, expect, it } from 'vitest';

import { Gender } from '@/generated/graphql';

import { genderOptions } from '../genderOptions';

describe('genderOptions', () => {
  it('offers male, female and prefer-not-to-say', () => {
    expect(genderOptions.map((option) => option.id)).toEqual([
      Gender.Male,
      Gender.Female,
      Gender.Unknown,
    ]);
  });
});
