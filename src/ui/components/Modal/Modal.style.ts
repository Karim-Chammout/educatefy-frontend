import { Dialog } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledDialog = styled(Dialog)(() => ({
  '& .MuiDialog-paper': {
    position: 'relative',
    overflowY: 'auto',
  },

  '& .MuiDialogContent-root': {
    paddingTop: '8px !important',
  },

  '& .MuiDialogActions-root': {
    padding: '8px 24px',
  },
}));
