import { memo } from 'react';

import { ContentComponent } from '@/generated/graphql';
import { ContentComponentsType } from '@/types/types';
import { getContentComponentConfig } from '@/ui/compositions';

const ContentRenderer = ({ component }: { component: Partial<ContentComponentsType> }) => {
  const View = getContentComponentConfig(component.__typename || '')?.View;

  if (!View) return null;

  return <View component={component as ContentComponent} />;
};

export default memo(ContentRenderer);
