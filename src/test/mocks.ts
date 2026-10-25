/**
 * SHARED FAKE REST ENDPOINTS (MSW) — the server `setup.ts` starts before each file.
 */
import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';

export const statusAuthedHandler = (userId = 1, role = 'teacher') =>
  http.get('/api/openid/status', () => HttpResponse.json({ userId, role }));

export const statusGuestHandler = () =>
  http.get('/api/openid/status', () => new HttpResponse(null, { status: 401 }));

export const uploadOkHandler = (url = 'https://example.com/file.png') =>
  http.post('/api/file/upload', () => HttpResponse.json({ url }));

export const handlers = [statusGuestHandler(), uploadOkHandler()];

export const server = setupServer(...handlers);
