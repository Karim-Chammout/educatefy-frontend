import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

type EditorWrapperProps = {
  minHeight?: number | string;
  maxHeight?: number | string;
  hasError?: boolean;
  disabled?: boolean;
};

export const EditorWrapper = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== 'hasError' && prop !== 'minHeight' && prop !== 'maxHeight' && prop !== 'disabled',
})<EditorWrapperProps>(({ theme, hasError, minHeight, maxHeight, disabled }) => {
  const isDark = theme.palette.mode === 'dark';

  return {
    border: `1px solid ${hasError ? theme.palette.error.main : theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: disabled
      ? theme.palette.action.disabledBackground
      : theme.palette.background.paper,
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    overflow: 'hidden',

    '&:focus-within': {
      borderColor: hasError ? theme.palette.error.main : theme.palette.primary.main,
      boxShadow: hasError
        ? `0 0 0 2px ${theme.palette.error.main}33`
        : `0 0 0 2px ${theme.palette.primary.main}33`,
    },

    // ── TipTap editor area ──────────────────────────────────────────
    '.ProseMirror': {
      minHeight: minHeight ?? 300,
      maxHeight: maxHeight ?? 'none',
      overflowY: maxHeight ? 'auto' : 'visible',
      padding: theme.spacing(1.5, 2),
      outline: 'none',
      fontSize: theme.typography.body1.fontSize,
      lineHeight: 1.7,
      color: theme.palette.text.primary,
      cursor: disabled ? 'not-allowed' : 'text',

      '&.ProseMirror-focused': {
        outline: 'none',
      },

      // Placeholder
      'p.is-editor-empty:first-of-type::before': {
        content: 'attr(data-placeholder)',
        float: 'left',
        color: theme.palette.text.disabled,
        pointerEvents: 'none',
        height: 0,
      },

      // Headings
      'h1, h2, h3': {
        margin: theme.spacing(1.5, 0, 0.5),
        lineHeight: 1.3,
        fontWeight: 600,
        color: theme.palette.text.primary,
      },
      h1: { fontSize: '1.75rem' },
      h2: { fontSize: '1.4rem' },
      h3: { fontSize: '1.15rem' },

      // Paragraphs
      p: {
        margin: theme.spacing(0.5, 0),
      },

      // Lists
      'ul, ol': {
        paddingLeft: theme.spacing(3),
        margin: theme.spacing(0.5, 0),
      },
      li: { margin: theme.spacing(0.25, 0) },

      // Blockquote
      blockquote: {
        borderLeft: `4px solid ${theme.palette.primary.main}`,
        margin: theme.spacing(1, 0),
        paddingLeft: theme.spacing(2),
        color: theme.palette.text.secondary,
        fontStyle: 'italic',
        backgroundColor: isDark
          ? `${theme.palette.primary.main}14`
          : `${theme.palette.primary.main}0A`,
        borderRadius: `0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0`,
        padding: theme.spacing(0.75, 2),
      },

      // Inline code
      code: {
        backgroundColor: isDark ? theme.palette.grey[200] : theme.palette.grey[100],
        color: isDark ? theme.palette.error.light : theme.palette.error.dark,
        borderRadius: 4,
        padding: '2px 6px',
        fontFamily: '"Fira Code", "Cascadia Code", "Consolas", monospace',
        fontSize: '0.875em',
      },

      // Code block
      pre: {
        backgroundColor: isDark ? theme.palette.grey[100] : theme.palette.grey[100],
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(1.5, 2),
        overflowX: 'auto',
        margin: theme.spacing(1, 0),

        code: {
          backgroundColor: 'transparent',
          color: isDark ? theme.palette.grey[900] : theme.palette.grey[800],
          padding: 0,
          fontSize: '0.875em',
        },
      },

      // Horizontal rule
      hr: {
        border: 'none',
        borderTop: `1px solid ${theme.palette.divider}`,
        margin: theme.spacing(2, 0),
      },

      // Links
      a: {
        color: theme.palette.primary.main,
        textDecoration: 'underline',
        textUnderlineOffset: 2,
        '&:hover': {
          color: theme.palette.primary.dark,
          opacity: 1,
        },
      },

      // Images
      img: {
        maxWidth: '100%',
        height: 'auto',
        borderRadius: theme.shape.borderRadius,
        display: 'block',
        margin: theme.spacing(1, 0),
        cursor: 'pointer',

        '&.ProseMirror-selectednode': {
          outline: `3px solid ${theme.palette.primary.main}`,
          outlineOffset: 2,
        },
      },

      // Resize wrapper injected by ResizableNodeView
      '.resizable-node-view': {
        display: 'inline-block',
        position: 'relative',
        maxWidth: '100%',
      },

      // Resize handles
      '[data-resize-handle]': {
        position: 'absolute',
        width: 10,
        height: 10,
        backgroundColor: theme.palette.primary.main,
        border: `1px solid ${theme.palette.background.paper}`,
        zIndex: 10,
        opacity: 1,
        '&[data-resize-handle="top-left"]': {
          top: '4px !important',
          left: '-4px !important',
          cursor: 'nw-resize',
        },
        '&[data-resize-handle="top-right"]': {
          top: '4px !important',
          right: '-4px !important',
          cursor: 'ne-resize',
        },
        '&[data-resize-handle="bottom-left"]': {
          bottom: '4px !important',
          left: '-4px !important',
          cursor: 'sw-resize',
        },
        '&[data-resize-handle="bottom-right"]': {
          bottom: '4px !important',
          right: '-4px !important',
          cursor: 'se-resize',
        },
      },

      // iframes
      '.iframe-wrapper': {
        position: 'relative',
        margin: theme.spacing(1.5, 0),
        borderRadius: theme.shape.borderRadius,
        overflow: 'hidden',
        backgroundColor: isDark ? theme.palette.grey[100] : theme.palette.grey[100],
        border: `1px solid ${theme.palette.divider}`,

        iframe: {
          display: 'block',
          width: '100%',
          height: 480,
          border: 'none',
        },

        '&.ProseMirror-selectednode': {
          outline: `3px solid ${theme.palette.primary.main}`,
          outlineOffset: 2,
        },
      },

      // Text alignment — TipTap injects inline styles
      '[style*="text-align: center"]': { textAlign: 'center' },
      '[style*="text-align: right"]': { textAlign: 'right' },
      '[style*="text-align: left"]': { textAlign: 'left' },
    },
  };
});

export const ToolbarWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(0.25),
  padding: theme.spacing(0.75, 1),
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.grey[50],
  alignItems: 'center',
}));

export const ToolbarDivider = styled('span')(({ theme }) => ({
  width: 1,
  height: 20,
  backgroundColor: theme.palette.divider,
  margin: theme.spacing(0, 0.5),
  display: 'inline-block',
  flexShrink: 0,
}));
