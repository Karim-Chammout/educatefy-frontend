import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { ErrorLink } from '@apollo/client/link/error';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { OperationTypeNode } from 'graphql';
import { createClient } from 'graphql-ws';
import { Observable, tap } from 'rxjs';

import { refreshSession } from '@/utils/refreshSession';
import { terminatSession } from '@/utils/logout';
import { applyRenewRefreshToken, getRefreshTokenHeader } from '@/utils/authHeaders';

export const BASE_URL = import.meta.env.VITE_BASE_URL;

const httpLink = new HttpLink({
  uri: `${BASE_URL}/graphql/`,
  credentials: 'include',
});

const authMiddleware = new ApolloLink((operation, forward) => {
  const headers: Record<string, string> = {};
  const refreshToken = getRefreshTokenHeader();

  if (refreshToken) {
    headers.refreshtoken = refreshToken;
  }

  operation.setContext({
    headers,
  });

  return forward(operation);
});

const replaceTokenLink = new ApolloLink((operation, forward) =>
  forward(operation).pipe(
    tap({
      next: () => {
        const headers = operation.getContext().response?.headers;

        if (headers) {
          applyRenewRefreshToken(headers);
        }
      },
    }),
  ),
);

const hasSubscriptionOperation = (operation: ApolloLink.Operation) =>
  operation.operationType === OperationTypeNode.SUBSCRIPTION;

const wsLink = new GraphQLWsLink(
  createClient({
    url: `${BASE_URL}/graphql/`,
    keepAlive: 10_000,
  }),
);

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.split(
    hasSubscriptionOperation,
    wsLink,
    ApolloLink.from([
      new ErrorLink(({ error, operation, forward }) => {
        if (
          error &&
          'errors' in error &&
          Array.isArray(error.errors) &&
          error.errors[0].extensions.code === 'NOT_AUTHORIZED'
        ) {
          return new Observable((observer) => {
            refreshSession()
              .then((newToken) => {
                if (!newToken) {
                  terminatSession();
                  observer.complete();

                  return;
                }

                forward(operation).subscribe(observer);
              })
              .catch(() => {
                observer.complete();
              });
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
