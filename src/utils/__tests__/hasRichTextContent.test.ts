import type { JSONContent } from '@tiptap/core';
import { describe, expect, it } from 'vitest';

import { hasRichTextContent } from '../hasRichTextContent';

describe('hasRichTextContent', () => {
  it.each([null, undefined])('returns false for %s', (value) => {
    expect(hasRichTextContent(value)).toBe(false);
  });

  it('returns false for a doc without content', () => {
    expect(hasRichTextContent({ type: 'doc' })).toBe(false);
    expect(hasRichTextContent({ type: 'doc', content: [] })).toBe(false);
  });

  it('returns false for whitespace-only paragraphs', () => {
    const value: JSONContent = {
      type: 'doc',
      content: [{ type: 'paragraph', content: [{ type: 'text', text: '   ' }] }],
    };

    expect(hasRichTextContent(value)).toBe(false);
  });

  it('returns true for paragraphs with text', () => {
    const value: JSONContent = {
      type: 'doc',
      content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Hello' }] }],
    };

    expect(hasRichTextContent(value)).toBe(true);
  });

  it('returns true for non-text block nodes such as images', () => {
    const value: JSONContent = {
      type: 'doc',
      content: [{ type: 'image', attrs: { src: 'https://example.com/a.png' } }],
    };

    expect(hasRichTextContent(value)).toBe(true);
  });
});
