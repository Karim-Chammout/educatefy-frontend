import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const EditorWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'languageDirection',
})<{ languageDirection: string }>(({ theme, languageDirection }) => ({
  position: 'relative',
  width: '100%',

  '& .ql-toolbar': {
    direction: languageDirection,
    borderColor: theme.palette.divider,
    borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
  },
  '& .ql-container': {
    borderColor: theme.palette.divider,
    borderRadius: `0 0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px`,
    fontFamily: theme.typography.fontFamily,
  },
  '& .ql-editor': {
    minHeight: '200px',
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.body1.fontSize,
    '&.ql-blank::before': {
      fontStyle: 'normal',
      color: theme.palette.text.secondary,
    },
  },
}));

export const LoadingOverlay = styled(Backdrop)(({ theme }) => ({
  position: 'absolute',
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  color: theme.palette.primary.main,
}));
