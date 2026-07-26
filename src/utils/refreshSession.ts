import { BASE_URL } from '@/ui/layout/apolloClient';

let refreshPromise: Promise<string | null> | null = null;

export async function refreshSession(): Promise<string | null> {
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');

      if (!refreshToken) {
        return null;
      }

      const response = await fetch(`${BASE_URL}/graphql/`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          refreshtoken: refreshToken,
        },
        body: JSON.stringify({ query: '{ __typename }' }),
      });

      const newRefreshToken = response.headers.get('X-Renew-Refresh-Token');
      if (newRefreshToken) {
        localStorage.setItem('refreshToken', newRefreshToken);
      }

      return response.ok ? 'ok' : null;
    } catch {
      return null;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}
