import type { JSONContent } from '@tiptap/core';

/**
 * Recursively extracts all plain text from a TipTap JSONContent node.
 */
function extractText(node: JSONContent): string {
  if (node.type === 'text') {
    return node.text ?? '';
  }

  if (!node.content || node.content.length === 0) {
    return '';
  }

  return node.content.map(extractText).join('');
}

/**
 * Returns true if the TipTap JSONContent has any meaningful content —
 * i.e. it is not null, not an empty doc, and not a doc with only empty/whitespace paragraphs
 */
export function hasRichTextContent(value: JSONContent | null | undefined): boolean {
  if (!value) return false;

  const { content } = value;

  if (!content || content.length === 0) return false;

  return content.some((node) => {
    // Non-text block nodes (image, iframe, etc.) always count as content
    if (node.type !== 'paragraph' && node.type !== 'heading') {
      return true;
    }

    // For paragraph/heading nodes, check if they contain non-whitespace text
    // or any non-text child nodes (e.g. inline images)
    if (node.content && node.content.length > 0) {
      const hasNonTextChild = node.content.some((child) => child.type !== 'text');
      if (hasNonTextChild) return true;

      const text = extractText(node);
      if (text.trim().length > 0) return true;
    }

    return false;
  });
}
