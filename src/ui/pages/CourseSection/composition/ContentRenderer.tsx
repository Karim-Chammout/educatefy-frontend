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

  return null;
};

export default ContentRenderer;
