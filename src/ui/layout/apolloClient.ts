import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  makeVar,
  Operation,
  split,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';

import { terminatSession } from '@/utils/logout';

export const BASE_URL = import.meta.env.VITE_BASE_URL;

export const isLoggedIn = makeVar(!!localStorage.getItem('JWT'));

const httpLink = new HttpLink({
  uri: `${BASE_URL}/graphql/`,
});

const authMiddleware = new ApolloLink((operation, forward) => {
  const JWT = localStorage.getItem('JWT');
  const refreshToken = localStorage.getItem('refreshToken');
  const headers: { [key: string]: string | null } = {};

  if (JWT) {
    headers.authorization = `Bearer ${JWT}`;
    headers.refreshtoken = refreshToken;
    isLoggedIn(true);
  }

  operation.setContext({
    headers,
  });

  return forward(operation);
});

const replaceTokenLink = new ApolloLink((operation, forward) =>
  forward(operation).map((data) => {
    const newToken = operation.getContext().response.headers.get('X-Renew-Token');

    if (newToken) {
      localStorage.setItem('JWT', newToken);
    }

    return data;
  }),
);

const hasSubscriptionOperation = (operation: Operation) => {
  const definition = getMainDefinition(operation.query);

  return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
};

const wsLink = new GraphQLWsLink(
  createClient({
    url: `${BASE_URL}/graphql/`,
    connectionParams: () => {
      const JWT = localStorage.getItem('JWT');

      return {
        authorization: JWT ? `Bearer ${JWT}` : '',
      };
    },
  }),
);

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: split(
    hasSubscriptionOperation,
    wsLink,
    ApolloLink.from([
      onError(({ networkError, response }) => {
        if (networkError && 'statusCode' in networkError && networkError.statusCode === 401) {
          if (response) {
            response.errors = undefined;
          }

          terminatSession().catch(() => {
            /* ignore this error */
          });
        }
      }),
      replaceTokenLink,
      authMiddleware,
      httpLink,
    ]),
  ),
  devtools: {
    enabled: import.meta.env.DEV,
  },
});
