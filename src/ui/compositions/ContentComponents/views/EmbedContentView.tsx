import { EmbedContent } from '@/generated/graphql';

import { getEmbedUrl } from '../embedProviders';
import { ViewProps } from '../types';
import { EmbedFrame } from './EmbedContentView.style';

export const EmbedContentView = ({ component }: ViewProps) => {
  const embedContent = component as EmbedContent;

  if (!embedContent.url) return null;

  const embedUrl = getEmbedUrl(embedContent.provider, embedContent.url);

  if (!embedUrl) return null;

  return (
    <EmbedFrame
      title={embedContent.provider}
      src={embedUrl}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />
  );
};
