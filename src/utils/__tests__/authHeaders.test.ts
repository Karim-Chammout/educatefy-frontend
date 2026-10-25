import { describe, expect, it } from 'vitest';

import { applyRenewRefreshToken, getRefreshTokenHeader } from '../authHeaders';

describe('getRefreshTokenHeader', () => {
  it('returns undefined when no refresh token is stored', () => {
    expect(getRefreshTokenHeader()).toBe(undefined);
  });

  it('returns the stored refresh token', () => {
    localStorage.setItem('refreshToken', 'stored-token');

    expect(getRefreshTokenHeader()).toBe('stored-token');
  });
});

describe('applyRenewRefreshToken', () => {
  it('persists the rotated token from a Headers instance', () => {
    const headers = new Headers({ 'X-Renew-Refresh-Token': 'rotated-token' });

    applyRenewRefreshToken(headers);

    expect(localStorage.getItem('refreshToken')).toBe('rotated-token');
  });

  it('persists the rotated token from a plain header object', () => {
    applyRenewRefreshToken({ 'x-renew-refresh-token': 'plain-token' });

    expect(localStorage.getItem('refreshToken')).toBe('plain-token');
  });

  it('leaves storage untouched when no renewal header is present', () => {
    localStorage.setItem('refreshToken', 'original');

    applyRenewRefreshToken(new Headers());
    applyRenewRefreshToken({});

    expect(localStorage.getItem('refreshToken')).toBe('original');
  });
});
