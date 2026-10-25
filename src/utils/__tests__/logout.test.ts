import { HttpResponse, http } from 'msw';
import { describe, expect, it, vi } from 'vitest';

import { client } from '@/ui/layout/apolloClient';

import { terminatSession } from '../logout';
import { server } from '../../test/mocks';

vi.mock('@/ui/layout/apolloClient', () => ({
  BASE_URL: 'http://session.test',
  client: { clearStore: vi.fn() },
}));

describe('terminatSession', () => {
  it('revokes the refresh token, clears storage and the apollo store', async () => {
    const requests: Request[] = [];

    server.use(
      http.post('http://session.test/api/openid/logout', async ({ request }) => {
        requests.push(request.clone());

        return new HttpResponse(null, { status: 200 });
      }),
    );
    localStorage.setItem('refreshToken', 'stored-token');

    await terminatSession();

    expect(requests).toHaveLength(1);
    expect(requests[0].headers.get('refreshtoken')).toBe('stored-token');
    expect(localStorage.getItem('refreshToken')).toBe(null);
    expect(client.clearStore).toHaveBeenCalled();
  });

  it('skips the revoke call when no refresh token is stored', async () => {
    const requests: Request[] = [];

    server.use(
      http.post('http://session.test/api/openid/logout', async ({ request }) => {
        requests.push(request.clone());

        return new HttpResponse(null, { status: 200 });
      }),
    );

    await terminatSession();

    expect(requests).toHaveLength(0);
    expect(client.clearStore).toHaveBeenCalled();
  });
});
