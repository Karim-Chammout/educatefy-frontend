import { ContentComponentsType } from '@/types/types';
import { RichTextContent } from '@/ui/compositions';
import { getMediaUrl } from '@/utils/getMediaUrl';
import { hasRichTextContent } from '@/utils/hasRichTextContent';

import { VideoComponent } from '../Section.style';

const ContentRenderer = ({ component }: { component: Partial<ContentComponentsType> }) => {
  if (component.__typename === 'TextContent' && hasRichTextContent(component.content)) {
    return <RichTextContent value={component.content} />;
  }

  if (component.__typename === 'VideoContent' && component.url) {
    return (
      <VideoComponent controls>
        <source src={getMediaUrl(component.url)} type={`video/${component.url.split('.').pop()}`} />
        Your browser does not support the video tag.
      </VideoComponent>
    );
  }

  if (component.__typename === 'YouTubeContent') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <iframe
          width="100%"
          height="500"
          src={`https://www.youtube-nocookie.com/embed/${component.youtube_video_id}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          style={{ border: 0 }}
          allowFullScreen
        />
        {hasRichTextContent(component.description) && (
          <RichTextContent value={component.description} />
        )}
      </div>
    );
  }

  return null;
};

export default ContentRenderer;
