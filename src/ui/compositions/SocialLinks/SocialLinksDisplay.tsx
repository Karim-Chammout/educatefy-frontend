import { useTheme } from '@mui/material/styles';

import {
  darkModeHostileBrands,
  socialPlatformBrandColors,
  getSocialPlatformIcon,
} from '@/utils/socialPlatform';

import {
  LinkDivider,
  LinkIcon,
  LinkItem,
  LinkLabel,
  LinkLabelBox,
  LinkRow,
  LinksRoot,
  LinkSublabel,
  PrimaryBadge,
} from './SocialLinksDisplay.style';

export type SocialLinkDisplayItem = {
  id: string | number;
  platform: string;
  platformDisplayName: string;
  userName?: string | null;
  displayName?: string | null;
  url: string;
  isPrimary?: boolean;
};

const renderLabel = (link: SocialLinkDisplayItem) => {
  const hasDisplayName = typeof link.displayName === 'string' && link.displayName.trim();
  const hasUserName = typeof link.userName === 'string' && link.userName.trim();

  if (hasDisplayName) {
    return (
      <>
        <LinkLabel variant="body2">{link.displayName!.trim()}</LinkLabel>
        {hasUserName && <LinkSublabel variant="caption">@{link.userName!.trim()}</LinkSublabel>}
      </>
    );
  }

  if (hasUserName) {
    return <LinkLabel variant="body2">@{link.userName!.trim()}</LinkLabel>;
  }

  return <LinkLabel variant="body2">{link.platformDisplayName}</LinkLabel>;
};

const SocialLinksDisplay = ({ links }: { links: Array<SocialLinkDisplayItem> }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <LinksRoot>
      {links.map((link, index) => {
        const IconComponent = getSocialPlatformIcon(link.platform);

        let brand = socialPlatformBrandColors[link.platform];
        if (brand && isDark && darkModeHostileBrands.has(link.platform)) {
          brand = '#FFFFFF';
        }
        const iconColor = brand ?? theme.palette.text.secondary;

        return (
          <LinkItem key={link.id}>
            {index > 0 && <LinkDivider />}
            <LinkRow
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              title={`${link.displayName ?? link.userName ?? link.platformDisplayName} — ${link.platformDisplayName}`}
            >
              <LinkIcon iconColor={iconColor}>
                <IconComponent sx={{ fontSize: 20 }} />
              </LinkIcon>

              <LinkLabelBox>{renderLabel(link)}</LinkLabelBox>

              {link.isPrimary && (
                <PrimaryBadge label="Primary" color="primary" variant="outlined" />
              )}
            </LinkRow>
          </LinkItem>
        );
      })}
    </LinksRoot>
  );
};

export default SocialLinksDisplay;
