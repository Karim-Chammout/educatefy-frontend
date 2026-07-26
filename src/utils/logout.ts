import { getAuthRefresh } from '@/ui/context/AuthContext';
import { BASE_URL, client } from '@/ui/layout/apolloClient';

async function revokeRefreshToken(): Promise<void> {
  const refreshToken = localStorage.getItem('refreshToken');

  if (!refreshToken) {
    return;
  }

  await fetch(`${BASE_URL}/api/openid/logout`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      refreshtoken: refreshToken,
    },
  }).catch(() => {
    // Ignore network errors — always clear local state
  });
}

export const terminatSession = async () => {
  await revokeRefreshToken();

  localStorage.removeItem('refreshToken');
  await client.clearStore();
  // Tell AuthContext to re-check the JWT cookie via /api/openid/status.
  // This sets user = null immediately so Main.tsx re-routes to public pages.
  await getAuthRefresh()?.();
};

export const logout = async () => {
  await terminatSession();

  return (window.location.href = '/explore');
};
