import { TextContent } from '@/generated/graphql';
import RichTextContent from '@/ui/compositions/RichTextContent';
import { hasRichTextContent } from '@/utils/hasRichTextContent';

import { ViewProps } from '../types';

export const TextContentView = ({ component }: ViewProps) => {
  const textContent = component as TextContent;

  if (!hasRichTextContent(textContent.content)) return null;

  return <RichTextContent value={textContent.content} />;
};
