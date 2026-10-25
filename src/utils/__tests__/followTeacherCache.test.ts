import { ApolloClient, ApolloLink, InMemoryCache, gql } from '@apollo/client';
import { describe, expect, it, vi } from 'vitest';

import { HomeDocument } from '@/generated/graphql';

import { applyFollowTeacherResult } from '../followTeacherCache';

const TEACHER_FRAGMENT = gql`
  fragment TeacherFollowState on Teacher {
    isFollowed
    followersCount
  }
`;

const teacherId = (client: ApolloClient) =>
  client.cache.identify({ __typename: 'Teacher', id: '7' });

const buildClient = () => {
  const client = new ApolloClient({ cache: new InMemoryCache(), link: ApolloLink.empty() });

  client.writeFragment({
    id: teacherId(client),
    fragment: TEACHER_FRAGMENT,
    data: { __typename: 'Teacher', isFollowed: false, followersCount: 10 },
  });

  return client;
};

const readState = (client: ApolloClient) =>
  client.readFragment({ id: teacherId(client), fragment: TEACHER_FRAGMENT });

const successResult = (isFollowing: boolean) => ({
  __typename: 'FollowTeacherResult' as const,
  success: true,
  isFollowing,
  errors: [],
});

describe('applyFollowTeacherResult', () => {
  it('marks the teacher followed and bumps the count', () => {
    const client = buildClient();
    const refetch = vi.spyOn(client, 'refetchQueries');

    applyFollowTeacherResult(client, '7', successResult(true));

    expect(readState(client)).toMatchObject({ isFollowed: true, followersCount: 11 });
    expect(refetch).toHaveBeenCalledWith({ include: [HomeDocument] });
  });

  it('marks the teacher unfollowed and decrements the count', () => {
    const client = buildClient();

    applyFollowTeacherResult(client, '7', successResult(false));

    expect(readState(client)).toMatchObject({ isFollowed: false, followersCount: 9 });
  });

  it('never drops the followers count below zero', () => {
    const client = buildClient();

    client.writeFragment({
      id: teacherId(client),
      fragment: TEACHER_FRAGMENT,
      data: { __typename: 'Teacher', isFollowed: true, followersCount: 0 },
    });

    applyFollowTeacherResult(client, '7', successResult(false));

    expect(readState(client)).toMatchObject({ isFollowed: false, followersCount: 0 });
  });

  it.each([null, undefined])('ignores a %s result', (result) => {
    const client = buildClient();
    const refetch = vi.spyOn(client, 'refetchQueries');

    applyFollowTeacherResult(client, '7', result);

    expect(readState(client)).toMatchObject({ isFollowed: false, followersCount: 10 });
    expect(refetch).not.toHaveBeenCalled();
  });

  it('ignores unsuccessful results and results without isFollowing', () => {
    const client = buildClient();

    applyFollowTeacherResult(client, '7', { ...successResult(true), success: false });
    applyFollowTeacherResult(client, '7', { ...successResult(true), isFollowing: null });

    expect(readState(client)).toMatchObject({ isFollowed: false, followersCount: 10 });
  });
});
