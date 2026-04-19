import { generateHTML } from '@tiptap/core';
import { Color } from '@tiptap/extension-color';
import HighlightExtension from '@tiptap/extension-highlight';
import ImageExtension from '@tiptap/extension-image';
import LinkExtension from '@tiptap/extension-link';
import { TableKit } from '@tiptap/extension-table';
import TextAlignExtension from '@tiptap/extension-text-align';
import { FontSize, TextStyle } from '@tiptap/extension-text-style';
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
  TextStyle,
  FontSize,
  Color,
  HighlightExtension.configure({ multicolor: true }),
  TableKit,
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
