import { describe, expect, it } from 'vitest';

import { AccountRole, Gender, type AccountFragment } from '@/generated/graphql';

import { hasMissingAccountData } from '../hasMissingAccountData';

const country = { __typename: 'Country' as const, id: '1', denomination: 'Egypt' };

const description = {
  type: 'doc',
  content: [{ type: 'paragraph', content: [{ type: 'text', text: 'About me' }] }],
};

const completeStudent: AccountFragment = {
  __typename: 'Account',
  id: '1',
  nickname: 'karim',
  first_name: 'Karim',
  last_name: 'Ali',
  gender: Gender.Male,
  date_of_birth: '2000-01-01',
  avatar_url: null,
  preferredLanguage: 'en',
  accountRole: AccountRole.Student,
  bio: null,
  description: null,
  country,
  nationality: country,
  subjects: [],
};

describe('hasMissingAccountData', () => {
  it.each([null, undefined])('returns false for %s', (account) => {
    expect(hasMissingAccountData(account)).toBe(false);
  });

  it('returns false for a student with all profile fields', () => {
    expect(hasMissingAccountData(completeStudent)).toBe(false);
  });

  it('returns true when a profile field is missing', () => {
    expect(hasMissingAccountData({ ...completeStudent, nickname: null })).toBe(true);
    expect(hasMissingAccountData({ ...completeStudent, country: null })).toBe(true);
    expect(hasMissingAccountData({ ...completeStudent, date_of_birth: null })).toBe(true);
  });

  it('returns false for a teacher with bio, subjects and description', () => {
    const teacher: AccountFragment = {
      ...completeStudent,
      accountRole: AccountRole.Teacher,
      bio: 'Math teacher',
      description,
      subjects: [{ __typename: 'Subject', id: '1', denomination: 'Math' }],
    };

    expect(hasMissingAccountData(teacher)).toBe(false);
  });

  it('returns true for a teacher missing bio or description', () => {
    const teacher: AccountFragment = {
      ...completeStudent,
      accountRole: AccountRole.Teacher,
      bio: 'Math teacher',
      description,
      subjects: [{ __typename: 'Subject', id: '1', denomination: 'Math' }],
    };

    expect(hasMissingAccountData({ ...teacher, bio: null })).toBe(true);
    expect(hasMissingAccountData({ ...teacher, description: null })).toBe(true);
  });
});
