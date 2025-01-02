import CloseIcon from '@mui/icons-material/Close';
import { useMediaQuery, useTheme } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { ReactNode } from 'react';

import { StyledDialog } from './Modal.style';

type ModalType = {
  open: boolean;
  onClose: () => void;
  children?: ReactNode;
  CTAs?: ReactNode;
  title?: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
};

const Modal = ({
  open,
  onClose,
  title,
  children,
  CTAs,
  maxWidth = 'sm',
  fullWidth = true,
}: ModalType) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      fullScreen={isMobile}
      aria-labelledby={title}
    >
      {title && (
        <DialogTitle id={title} sx={{ fontWeight: 'bold', paddingRight: '48px' }}>
          {title}
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
      )}
      {children && <DialogContent>{children}</DialogContent>}
      {CTAs}
    </StyledDialog>
  );
};

export default Modal;
