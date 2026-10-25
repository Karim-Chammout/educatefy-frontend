import { describe, expect, it } from 'vitest';

import { savePostLoginRedirectPath } from '../savePostLoginRedirectPath';

describe('savePostLoginRedirectPath', () => {
  it('stores the path for post-login redirect', () => {
    savePostLoginRedirectPath('/courses/math-101');

    expect(sessionStorage.getItem('postLoginRedirect')).toBe('/courses/math-101');
  });
});
