import { generateHTML } from '@tiptap/core';
import ImageExtension from '@tiptap/extension-image';
import LinkExtension from '@tiptap/extension-link';
import TextAlignExtension from '@tiptap/extension-text-align';
import { JSONContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useMemo } from 'react';

import IframeExtension from '../RichTextEditor/IframeExtension';
import { RichTextContentWrapper } from './RichTextContent.style';

type RichTextContentProps = {
  value?: JSONContent | null;
  className?: string;
};

/**
 * The extensions list here must mirror the ones in RichTextEditor
 * so that generateHTML can correctly parse all node/mark types.
 */
const EXTENSIONS = [
  StarterKit,
  ImageExtension,
  LinkExtension.configure({ openOnClick: true }),
  TextAlignExtension.configure({ types: ['heading', 'paragraph'] }),
  IframeExtension,
];

const RichTextContent = ({ value, className }: RichTextContentProps) => {
  const html = useMemo(() => {
    if (!value) return '';

    try {
      return generateHTML(value, EXTENSIONS);
    } catch {
      return '';
    }
  }, [value]);

  if (!html) return null;

  return (
    <RichTextContentWrapper className={className} dangerouslySetInnerHTML={{ __html: html }} />
  );
};

export default RichTextContent;
