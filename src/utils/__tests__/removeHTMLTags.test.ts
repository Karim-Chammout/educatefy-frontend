import { describe, expect, it } from 'vitest';

import { removeHtmlTags } from '../removeHTMLTags';

describe('removeHtmlTags', () => {
  it('strips simple tags', () => {
    expect(removeHtmlTags('<p>hello</p>')).toBe('hello');
  });

  it('strips nested tags', () => {
    expect(removeHtmlTags('<p><strong>nested</strong> text</p>')).toBe('nested text');
  });

  it('leaves plain text untouched', () => {
    expect(removeHtmlTags('no tags here')).toBe('no tags here');
  });

  it('handles empty strings', () => {
    expect(removeHtmlTags('')).toBe('');
  });
});
