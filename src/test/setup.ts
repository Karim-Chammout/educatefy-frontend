/**
 * Runs once before EVERY test file
 *
 * Order matters: matchers → MSW server → shims → storage → beforeEach reset.
 */
import '@testing-library/jest-dom/vitest';

import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, beforeEach } from 'vitest';

import { server } from './mocks';

beforeAll(() => {
  server.listen({ onUnhandledFrame: 'error' });
});

afterEach(() => {
  cleanup();
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

// jsdom implements the DOM but NOT these browser APIs.

if (!window.matchMedia) {
  window.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => undefined,
    removeListener: () => undefined,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    dispatchEvent: () => false,
  });
}

// MUI's TextareaAutosize does `new ResizeObserver(...)`, so this shim must be
// constructible — a plain object would throw "not a constructor".
if (!window.ResizeObserver) {
  window.ResizeObserver = function ResizeObserverShim() {
    return {
      observe: () => undefined,
      unobserve: () => undefined,
      disconnect: () => undefined,
    };
  } as unknown as typeof ResizeObserver;
}

if (!window.IntersectionObserver) {
  window.IntersectionObserver = {
    observe: () => undefined,
    unobserve: () => undefined,
    disconnect: () => undefined,
    takeRecords: () => [],
  } as unknown as typeof IntersectionObserver;
}

if (window.HTMLElement && !window.HTMLElement.prototype.scrollIntoView) {
  window.HTMLElement.prototype.scrollIntoView = () => undefined;
}

// The Node runtime's global `localStorage`/`sessionStorage` leak into the
// jsdom window without implementing the Storage interface, so install
// deterministic in-memory implementations for tests.
class MemoryStorage implements Storage {
  private store = new Map<string, string>();

  get length() {
    return this.store.size;
  }

  clear() {
    this.store.clear();
  }

  getItem(key: string) {
    return this.store.get(key) ?? null;
  }

  key(index: number) {
    return [...this.store.keys()][index] ?? null;
  }

  removeItem(key: string) {
    this.store.delete(key);
  }

  setItem(key: string, value: string) {
    this.store.set(key, value);
  }
}

(['localStorage', 'sessionStorage'] as const).forEach((name) => {
  Object.defineProperty(window, name, {
    value: new MemoryStorage(),
    configurable: true,
    writable: true,
  });
  Object.defineProperty(globalThis, name, {
    value: window[name],
    configurable: true,
    writable: true,
  });
});

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
  document.documentElement.setAttribute('dir', 'ltr');
});
