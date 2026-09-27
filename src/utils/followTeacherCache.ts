import type { ApolloClient } from '@apollo/client';

import { FollowTeacherMutation } from '@/generated/graphql';

import { invalidateHomeContent } from './homeCache';

type FollowTeacherResult = FollowTeacherMutation['followTeacher'];

export const applyFollowTeacherResult = (
  client: ApolloClient,
  teacherId: string,
  result: FollowTeacherResult | null | undefined,
): void => {
  if (!result?.success || result.isFollowing === undefined || result.isFollowing === null) {
    return;
  }

  const { isFollowing } = result;

  client.cache.modify({
    id: client.cache.identify({ __typename: 'Teacher', id: teacherId }),
    fields: {
      isFollowed: () => isFollowing,
      followersCount: (current) =>
        typeof current === 'number' ? Math.max(0, current + (isFollowing ? 1 : -1)) : current,
    },
  });

  invalidateHomeContent(client);
};
