import type { ApolloClient } from '@apollo/client';

import { HomeDocument } from '@/generated/graphql';

export const invalidateHomeContent = (client: ApolloClient): void => {
  client.refetchQueries({ include: [HomeDocument] });
};
