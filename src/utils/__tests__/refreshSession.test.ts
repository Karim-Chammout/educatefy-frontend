import { HttpResponse, http } from 'msw';
import { describe, expect, it, vi } from 'vitest';

import { refreshSession } from '../refreshSession';
import { server } from '../../test/mocks';

vi.mock('@/ui/layout/apolloClient', () => ({
  BASE_URL: 'http://session.test',
}));

const graphqlOk = (renewToken?: string) =>
  http.post('http://session.test/graphql', () => {
    const headers = renewToken ? { 'X-Renew-Refresh-Token': renewToken } : undefined;

    return new HttpResponse(null, { status: 200, headers });
  });

describe('refreshSession', () => {
  it('returns null without a request when no refresh token is stored', async () => {
    let calls = 0;

    server.use(
      http.post('http://session.test/graphql', () => {
        calls += 1;

        return new HttpResponse(null, { status: 200 });
      }),
    );

    await expect(refreshSession()).resolves.toBe(null);
    expect(calls).toBe(0);
  });

  it('persists the rotated token on success', async () => {
    server.use(graphqlOk('rotated-token'));
    localStorage.setItem('refreshToken', 'stored-token');

    await expect(refreshSession()).resolves.toBe('ok');
    expect(localStorage.getItem('refreshToken')).toBe('rotated-token');
  });

  it('returns null on an unauthorized response', async () => {
    server.use(
      http.post('http://session.test/graphql', () => new HttpResponse(null, { status: 401 })),
    );
    localStorage.setItem('refreshToken', 'stored-token');

    await expect(refreshSession()).resolves.toBe(null);
    expect(localStorage.getItem('refreshToken')).toBe('stored-token');
  });

  it('shares one request between concurrent calls', async () => {
    let calls = 0;

    server.use(
      http.post('http://session.test/graphql', async () => {
        calls += 1;
        await new Promise((resolve) => {
          setTimeout(resolve, 20);
        });

        return new HttpResponse(null, { status: 200 });
      }),
    );
    localStorage.setItem('refreshToken', 'stored-token');

    const [first, second] = await Promise.all([refreshSession(), refreshSession()]);

    expect(first).toBe('ok');
    expect(second).toBe('ok');
    expect(calls).toBe(1);
  });
});
