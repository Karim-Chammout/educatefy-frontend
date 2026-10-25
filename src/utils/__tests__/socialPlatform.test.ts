import { describe, expect, it } from 'vitest';

import {
  getSocialLinkText,
  getSocialPlatformIcon,
  normalizeAndValidateSocialLinks,
  socialPlatformFallbackIcon,
} from '../socialPlatform';

describe('getSocialPlatformIcon', () => {
  it('resolves known platforms', () => {
    expect(getSocialPlatformIcon('github')).toBeDefined();
    expect(getSocialPlatformIcon('website')).toBeDefined();
  });

  it('falls back for unknown platforms', () => {
    expect(getSocialPlatformIcon('myspace')).toBe(socialPlatformFallbackIcon);
  });
});

describe('getSocialLinkText', () => {
  it('prefers the display name', () => {
    expect(
      getSocialLinkText({
        displayName: ' Karim ',
        userName: 'karim',
        platformDisplayName: 'GitHub',
      }),
    ).toBe('Karim');
  });

  it('falls back to @username then platform name', () => {
    expect(
      getSocialLinkText({ displayName: null, userName: 'karim', platformDisplayName: 'GitHub' }),
    ).toBe('@karim');
    expect(
      getSocialLinkText({ displayName: null, userName: null, platformDisplayName: 'GitHub' }),
    ).toBe('GitHub');
  });
});

describe('normalizeAndValidateSocialLinks', () => {
  it('accepts a valid link and auto-prefixes https', () => {
    const result = normalizeAndValidateSocialLinks([
      { platform: 'github', userName: '@karim', url: 'github.com/karim', isPrimary: true },
    ]);

    expect(result).toEqual({
      valid: true,
      links: [
        {
          platform: 'github',
          displayName: null,
          userName: 'karim',
          url: 'https://github.com/karim',
          isPrimary: true,
        },
      ],
    });
  });

  it('rejects unknown platforms and missing urls', () => {
    expect(
      normalizeAndValidateSocialLinks([{ platform: 'myspace', url: 'https://x.com' }]),
    ).toEqual({
      valid: false,
      errorKey: 'profile.socialPlatformRequired',
      errorParams: { index: '1' },
    });
    expect(normalizeAndValidateSocialLinks([{ platform: 'github', url: '  ' }])).toEqual({
      valid: false,
      errorKey: 'profile.socialUrlRequired',
      errorParams: { platform: 'GitHub' },
    });
  });

  it('requires https and matching hosts', () => {
    expect(
      normalizeAndValidateSocialLinks([{ platform: 'github', url: 'http://github.com/karim' }]),
    ).toMatchObject({ valid: false, errorKey: 'profile.socialUrlHttpsRequired' });
    expect(
      normalizeAndValidateSocialLinks([{ platform: 'github', url: 'https://gitlab.com/karim' }]),
    ).toMatchObject({ valid: false, errorKey: 'profile.socialUrlHostMismatch' });
    expect(
      normalizeAndValidateSocialLinks([{ platform: 'github', url: 'https://' }]),
    ).toMatchObject({ valid: false });
  });

  it('validates usernames and display names', () => {
    expect(
      normalizeAndValidateSocialLinks([
        { platform: 'x', userName: 'way-too-long-username', url: 'https://x.com/u' },
      ]),
    ).toMatchObject({ valid: false, errorKey: 'profile.socialUsernameInvalid' });
    expect(
      normalizeAndValidateSocialLinks([
        { platform: 'github', displayName: 'a'.repeat(101), url: 'https://github.com/k' },
      ]),
    ).toMatchObject({ valid: false, errorKey: 'profile.socialDisplayNameTooLong' });
  });

  it('trims trailing slashes and validates every entry', () => {
    const result = normalizeAndValidateSocialLinks([
      { platform: 'website', url: 'https://karim.dev/blog/' },
      { platform: '', url: 'https://karim.dev' },
    ]);

    expect(result).toMatchObject({ valid: false, errorKey: 'profile.socialPlatformRequired' });
  });
});
