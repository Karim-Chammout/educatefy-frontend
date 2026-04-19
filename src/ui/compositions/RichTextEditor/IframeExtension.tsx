import { Node, mergeAttributes } from '@tiptap/core';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    iframe: {
      setIframe: (options: { src: string }) => ReturnType;
    };
  }
}

/**
 * Converts a YouTube or Vimeo watch URL to its embed equivalent.
 * Any other URL is returned as-is.
 */
export function toEmbedUrl(url: string): string {
  try {
    const u = new URL(url);

    // YouTube: https://www.youtube.com/watch?v=ID or https://youtu.be/ID
    if (u.hostname.includes('youtube.com') && u.searchParams.get('v')) {
      const id = u.searchParams.get('v');

      return `https://www.youtube.com/embed/${id}`;
    }
    if (u.hostname === 'youtu.be') {
      const id = u.pathname.slice(1);

      return `https://www.youtube.com/embed/${id}`;
    }

    // Vimeo: https://vimeo.com/ID
    if (u.hostname.includes('vimeo.com')) {
      const id = u.pathname.slice(1);

      return `https://player.vimeo.com/video/${id}`;
    }

    return url;
  } catch {
    return url;
  }
}

const IframeExtension = Node.create({
  name: 'iframe',
  group: 'block',
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      src: { default: null },
      width: { default: '100%' },
      height: { default: '480' },
      allowfullscreen: { default: true },
      frameborder: { default: '0' },
    };
  },

  parseHTML() {
    return [{ tag: 'iframe' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', { class: 'iframe-wrapper' }, ['iframe', mergeAttributes(HTMLAttributes)]];
  },

  addCommands() {
    return {
      setIframe:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: {
              src: toEmbedUrl(options.src),
            },
          });
        },
    };
  },
});

export default IframeExtension;
