import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, makeVar } from '@apollo/client';
import { ErrorLink } from '@apollo/client/link/error';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { OperationTypeNode } from 'graphql';
import { createClient } from 'graphql-ws';
import { map } from 'rxjs';

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
  forward(operation).pipe(
    map((data) => {
      const newToken = operation.getContext().response?.headers?.get('X-Renew-Token');

      if (newToken) {
        localStorage.setItem('JWT', newToken);
      }

      return data;
    }),
  ),
);

const hasSubscriptionOperation = (operation: ApolloLink.Operation) =>
  operation.operationType === OperationTypeNode.SUBSCRIPTION;

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
  link: ApolloLink.split(
    hasSubscriptionOperation,
    wsLink,
    ApolloLink.from([
      new ErrorLink(({ error, result }) => {
        if (
          error &&
          'errors' in error &&
          Array.isArray(error.errors) &&
          error.errors[0].extensions.code === 'NOT_AUTHORIZED'
        ) {
          if (result) {
            result.errors = undefined;
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
