import { SxProps, Theme } from '@mui/material';
import MUIModal from '@mui/material/Modal';
import { ReactNode } from 'react';

import { Typography } from '@/ui/components';

import { StyledBox } from './Modal.style';

type ModalType = {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  sx?: SxProps<Theme>;
  children?: ReactNode;
};

const Modal = ({ open, onClose, title, description, sx, children }: ModalType) => {
  return (
    <MUIModal
      open={open}
      onClose={onClose}
      sx={{ ...sx }}
      aria-labelledby={`${title}-modal`}
      aria-describedby={`${description}-modal`}
    >
      <StyledBox>
        {title && (
          <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
            {title}
          </Typography>
        )}
        {description && <Typography sx={{ mb: 3 }}>{description}</Typography>}
        {children}
      </StyledBox>
    </MUIModal>
  );
};

export default Modal;
