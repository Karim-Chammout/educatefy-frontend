import { client, isLoggedIn } from '@/ui/layout/apolloClient';

export const terminatSession = async () => {
  localStorage.removeItem('JWT');
  localStorage.removeItem('refreshToken');
  isLoggedIn(false);
  await client.clearStore();
};

export const logout = async () => {
  await terminatSession();

  return (window.location.href = '/login');
};
