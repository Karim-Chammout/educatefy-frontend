import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const RichTextContentWrapper = styled(Box)(({ theme }) => {
  const isDark = theme.palette.mode === 'dark';

  return {
    fontSize: theme.typography.body1.fontSize,
    lineHeight: 1.75,
    color: theme.palette.text.primary,
    wordBreak: 'break-word',

    'h1, h2, h3, h4, h5, h6': {
      fontWeight: 600,
      lineHeight: 1.3,
      color: theme.palette.text.primary,
      margin: theme.spacing(2, 0, 0.75),
      '&:first-of-type': { marginTop: 0 },
    },
    h1: { fontSize: '1.75rem' },
    h2: { fontSize: '1.4rem' },
    h3: { fontSize: '1.15rem' },

    p: {
      margin: theme.spacing(0.5, 0),
      '&:first-of-type': { marginTop: 0 },
    },

    'ul, ol': {
      paddingLeft: theme.spacing(3),
      margin: theme.spacing(0.75, 0),
    },
    li: { margin: theme.spacing(0.3, 0) },

    blockquote: {
      borderLeft: `4px solid ${theme.palette.primary.main}`,
      margin: theme.spacing(1.5, 0),
      padding: theme.spacing(0.75, 2),
      color: theme.palette.text.secondary,
      fontStyle: 'italic',
      backgroundColor: isDark
        ? `${theme.palette.primary.main}14`
        : `${theme.palette.primary.main}0A`,
      borderRadius: `0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0`,
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

    hr: {
      border: 'none',
      borderTop: `1px solid ${theme.palette.divider}`,
      margin: theme.spacing(2, 0),
    },

    // Tables
    table: {
      borderCollapse: 'collapse',
      tableLayout: 'fixed',
      width: '100%',
      margin: theme.spacing(1.5, 0),
      overflowX: 'auto',
      display: 'block',
    },

    'th, td': {
      border: `1px solid ${theme.palette.divider}`,
      padding: theme.spacing(0.75, 1.5),
      minWidth: 80,
      verticalAlign: 'top',
    },

    th: {
      fontWeight: 600,
      backgroundColor: isDark
        ? `${theme.palette.primary.main}18`
        : `${theme.palette.primary.main}0D`,
    },

    a: {
      color: theme.palette.primary.main,
      textDecoration: 'underline',
      textUnderlineOffset: 2,
      '&:hover': {
        color: theme.palette.primary.dark,
        opacity: 1,
      },
    },

    img: {
      maxWidth: '100%',
      height: 'auto',
      borderRadius: theme.shape.borderRadius,
      display: 'block',
      margin: theme.spacing(1.5, 0),
    },

    '.iframe-wrapper': {
      position: 'relative',
      margin: theme.spacing(2, 0),
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
    },
  };
});
