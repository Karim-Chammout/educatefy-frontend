import { AudioContent } from '@/generated/graphql';
import { getMediaUrl } from '@/utils/getMediaUrl';

import { ViewProps } from '../types';
import { AudioComponent } from './AudioContentView.style';

export const AudioContentView = ({ component }: ViewProps) => {
  const audioContent = component as AudioContent;

  if (!audioContent.url) return null;

  return (
    <AudioComponent controls>
      <source src={getMediaUrl(audioContent.url)} type={audioContent.mime_type || 'audio/mpeg'} />
      Your browser does not support the audio element.
    </AudioComponent>
  );
};
