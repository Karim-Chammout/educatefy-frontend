import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LanguageIcon from '@mui/icons-material/Language';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LinkIcon from '@mui/icons-material/Link';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';

export const socialPlatformIcons: Record<string, typeof LinkedInIcon> = {
  linkedin: LinkedInIcon,
  x: XIcon,
  youtube: YouTubeIcon,
  github: GitHubIcon,
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  tiktok: MusicNoteIcon,
  website: LanguageIcon,
};

export const socialPlatformFallbackIcon = LinkIcon;

export const socialPlatformOptions = [
  { id: 'linkedin', label: 'LinkedIn' },
  { id: 'x', label: 'X' },
  { id: 'youtube', label: 'YouTube' },
  { id: 'github', label: 'GitHub' },
  { id: 'instagram', label: 'Instagram' },
  { id: 'facebook', label: 'Facebook' },
  { id: 'tiktok', label: 'TikTok' },
  { id: 'website', label: 'Website' },
];

export const SOCIAL_PLATFORMS_MAX = 15;

export const socialPlatformBrandColors: Record<string, string> = {
  linkedin: '#0A66C2',
  x: '#0F1419',
  youtube: '#FF0000',
  github: '#24292F',
  instagram: '#E4405F',
  facebook: '#1877F2',
  tiktok: '#FE2C55',
};

/** Brands whose official color is near-black and need inverting on dark mode. */
export const darkModeHostileBrands = new Set(['x', 'github']);

export const getSocialPlatformIcon = (platform: string) =>
  socialPlatformIcons[platform] ?? socialPlatformFallbackIcon;

export type SocialLinkInputPayload = {
  platform: string;
  displayName?: string | null;
  userName?: string | null;
  url: string;
  isPrimary?: boolean;
};

export type SocialLinkNormalizedPayload = {
  platform: string;
  displayName: string | null;
  userName: string | null;
  url: string;
  isPrimary: boolean;
};

export type ValidationResult =
  | { valid: true; links: SocialLinkNormalizedPayload[] }
  | { valid: false; errorKey: string; errorParams?: Record<string, string> };

export const PLATFORM_CONFIGS: Record<
  string,
  { displayName: string; hosts: string[]; userNamePattern?: RegExp }
> = {
  linkedin: {
    displayName: 'LinkedIn',
    hosts: ['linkedin.com'],
    userNamePattern: /^[A-Za-z0-9-]{3,100}$/,
  },
  x: {
    displayName: 'X',
    hosts: ['x.com', 'twitter.com'],
    userNamePattern: /^[A-Za-z0-9_]{1,15}$/,
  },
  youtube: {
    displayName: 'YouTube',
    hosts: ['youtube.com', 'youtu.be'],
    userNamePattern: /^[A-Za-z0-9._-]{3,100}$/,
  },
  github: {
    displayName: 'GitHub',
    hosts: ['github.com'],
    userNamePattern: /^[A-Za-z0-9-]{1,39}$/,
  },
  instagram: {
    displayName: 'Instagram',
    hosts: ['instagram.com'],
    userNamePattern: /^[A-Za-z0-9._]{1,30}$/,
  },
  facebook: {
    displayName: 'Facebook',
    hosts: ['facebook.com', 'fb.com'],
    userNamePattern: /^[A-Za-z0-9.]{5,50}$/,
  },
  tiktok: {
    displayName: 'TikTok',
    hosts: ['tiktok.com'],
    userNamePattern: /^[A-Za-z0-9._]{1,24}$/,
  },
  website: {
    displayName: 'Website',
    hosts: [],
  },
};

export const normalizeAndValidateSocialLinks = (
  rawLinks: SocialLinkInputPayload[],
): ValidationResult => {
  const normalized: SocialLinkNormalizedPayload[] = [];

  for (let i = 0; i < rawLinks.length; i += 1) {
    const link = rawLinks[i];
    const platform = link.platform?.trim();

    if (!platform || !PLATFORM_CONFIGS[platform]) {
      return {
        valid: false,
        errorKey: 'profile.socialPlatformRequired',
        errorParams: { index: String(i + 1) },
      };
    }

    const config = PLATFORM_CONFIGS[platform];

    let rawUrl = (link.url ?? '').trim();
    if (!rawUrl) {
      return {
        valid: false,
        errorKey: 'profile.socialUrlRequired',
        errorParams: { platform: config.displayName },
      };
    }

    // Auto-prefix https:// if protocol is omitted
    if (!/^https?:\/\//i.test(rawUrl)) {
      rawUrl = `https://${rawUrl}`;
    }

    let parsedUrl: URL;
    try {
      parsedUrl = new URL(rawUrl);
    } catch {
      return {
        valid: false,
        errorKey: 'profile.socialUrlInvalid',
        errorParams: { platform: config.displayName },
      };
    }

    if (parsedUrl.protocol !== 'https:') {
      return {
        valid: false,
        errorKey: 'profile.socialUrlHttpsRequired',
        errorParams: { platform: config.displayName },
      };
    }

    if (parsedUrl.href.length > 2048) {
      return { valid: false, errorKey: 'profile.socialUrlTooLong' };
    }

    if (
      config.hosts.length > 0 &&
      !config.hosts.some(
        (host) => parsedUrl.hostname === host || parsedUrl.hostname.endsWith(`.${host}`),
      )
    ) {
      return {
        valid: false,
        errorKey: 'profile.socialUrlHostMismatch',
        errorParams: { platform: config.displayName, hosts: config.hosts.join(', ') },
      };
    }

    if (parsedUrl.pathname.length > 1 && parsedUrl.pathname.endsWith('/')) {
      parsedUrl.pathname = parsedUrl.pathname.slice(0, -1);
    }

    let userName: string | null = null;
    if (typeof link.userName === 'string') {
      userName = link.userName.trim().replace(/^@/, '') || null;
      if (userName && config.userNamePattern && !config.userNamePattern.test(userName)) {
        return {
          valid: false,
          errorKey: 'profile.socialUsernameInvalid',
          errorParams: { platform: config.displayName },
        };
      }
    }

    let displayName: string | null = null;
    if (typeof link.displayName === 'string') {
      displayName = link.displayName.trim() || null;
      if (displayName && displayName.length > 100) {
        return { valid: false, errorKey: 'profile.socialDisplayNameTooLong' };
      }
    }

    normalized.push({
      platform,
      displayName,
      userName,
      url: parsedUrl.href,
      isPrimary: !!link.isPrimary,
    });
  }

  return { valid: true, links: normalized };
};
