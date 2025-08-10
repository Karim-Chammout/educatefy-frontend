import { ContentComponentsType } from '@/types/types';
import { getMediaUrl } from '@/utils/getMediaUrl';

import { TextContent, VideoComponent } from '../Section.style';

const ContentRenderer = ({ component }: { component: Partial<ContentComponentsType> }) => {
  if (component.__typename === 'TextContent' && component.content) {
    return <TextContent dangerouslySetInnerHTML={{ __html: component.content }} />;
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
        {component.description && (
          <TextContent
            dangerouslySetInnerHTML={{
              __html: component.description,
            }}
          />
        )}
      </div>
    );
  }

  return null;
};

export default ContentRenderer;
