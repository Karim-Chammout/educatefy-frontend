import { YouTubeContent } from '@/generated/graphql';
import RichTextContent from '@/ui/compositions/RichTextContent';
import { hasRichTextContent } from '@/utils/hasRichTextContent';

import { ViewProps } from '../types';

export const YouTubeContentView = ({ component }: ViewProps) => {
  const youtubeContent = component as YouTubeContent;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <iframe
        width="100%"
        height="500"
        src={`https://www.youtube-nocookie.com/embed/${youtubeContent.youtube_video_id}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        style={{ border: 0 }}
        allowFullScreen
      />
      {hasRichTextContent(youtubeContent.description) && (
        <RichTextContent value={youtubeContent.description} />
      )}
    </div>
  );
};
