export type EmbedProvider = {
  value: string;
  label: string;
};

export const EMBED_PROVIDERS: EmbedProvider[] = [
  { value: 'youtube', label: 'YouTube' },
  { value: 'vimeo', label: 'Vimeo' },
  { value: 'loom', label: 'Loom' },
  { value: 'slides', label: 'Google Slides' },
  { value: 'drive', label: 'Google Drive' },
  { value: 'notion', label: 'Notion' },
  { value: 'codepen', label: 'CodePen' },
  { value: 'miro', label: 'Miro' },
  { value: 'figma', label: 'Figma' },
  { value: 'other', label: 'Other' },
];

export const getEmbedUrl = (provider: string, url: string): string => {
  const trimmed = url.trim();

  if (!trimmed) {
    return '';
  }

  switch (provider) {
    case 'youtube': {
      const match = trimmed.match(/(?:v=|youtu\.be\/|\/embed\/)([0-9A-Za-z_-]{11})/);

      return match ? `https://www.youtube.com/embed/${match[1]}` : trimmed;
    }
    case 'vimeo': {
      const match = trimmed.match(/vimeo\.com\/(\d+)/);

      return match ? `https://player.vimeo.com/video/${match[1]}` : trimmed;
    }
    case 'loom': {
      if (trimmed.includes('/share/')) {
        return trimmed.replace('/share/', '/embed/');
      }

      return trimmed;
    }
    case 'slides': {
      const match = trimmed.match(/presentation\/d\/([^/]+)/);

      return match ? `https://docs.google.com/presentation/d/${match[1]}/embed` : trimmed;
    }
    case 'drive': {
      const match = trimmed.match(/file\/d\/([^/]+)/);

      return match ? `https://drive.google.com/file/d/${match[1]}/preview` : trimmed;
    }
    case 'codepen': {
      const match = trimmed.match(/codepen\.io\/([^/]+)\/(?:pen|details)\/([^/?]+)/);

      return match ? `https://codepen.io/${match[1]}/embed/${match[2]}` : trimmed;
    }
    case 'miro': {
      const match = trimmed.match(/miro\.com\/app\/board\/([^/?]+)/);

      return match ? `https://miro.com/app/embed/${match[1]}` : trimmed;
    }
    case 'figma': {
      return `https://www.figma.com/embed?embed_host=astra&url=${encodeURIComponent(trimmed)}`;
    }
    default:
      return trimmed;
  }
};
