import { VideoContent } from '@/generated/graphql';
import { getMediaUrl } from '@/utils/getMediaUrl';

import { ViewProps } from '../types';
import { VideoComponent } from './VideoContentView.style';

export const VideoContentView = ({ component }: ViewProps) => {
  const videoContent = component as VideoContent;

  if (!videoContent.url) return null;

  return (
    <VideoComponent controls>
      <source
        src={getMediaUrl(videoContent.url)}
        type={`video/${videoContent.url.split('.').pop()}`}
      />
      Your browser does not support the video tag.
    </VideoComponent>
  );
};
