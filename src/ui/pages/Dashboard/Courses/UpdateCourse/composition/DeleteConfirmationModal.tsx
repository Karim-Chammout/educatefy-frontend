import DialogActions from '@mui/material/DialogActions';
import { useTranslation } from 'react-i18next';

import { Button, Modal, Typography } from '@/ui/components';

type DeleteConfirmationModalType = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const DeleteConfirmationModal = ({ open, onClose, onConfirm }: DeleteConfirmationModalType) => {
  const { t } = useTranslation();

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={t('course.confirmDeleteTitle')}
      maxWidth="xs"
      CTAs={
        <DialogActions>
          <Button variant="outlined" onClick={onClose} fullWidth>
            {t('common.cancel')}
          </Button>
          <Button color="error" onClick={onConfirm} fullWidth>
            {t('common.confirm')}
          </Button>
        </DialogActions>
      }
    >
      <Typography variant="body2" color="text.secondary">
        {t('course.confirmDeleteSubtitle')}
      </Typography>
    </Modal>
  );
};

export default DeleteConfirmationModal;
