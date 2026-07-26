export function getRefreshTokenHeader(): string | undefined {
  return localStorage.getItem('refreshToken') ?? undefined;
}

export function applyRenewRefreshToken(headers: object): void {
  const token =
    headers instanceof Headers
      ? headers.get('X-Renew-Refresh-Token')
      : (headers as Record<string, any>)['x-renew-refresh-token'];

  if (token) {
    localStorage.setItem('refreshToken', token);
  }
}
