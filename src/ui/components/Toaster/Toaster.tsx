import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

type ToasterLevelType = 'success' | 'info' | 'warning' | 'error';

type ToasterType = {
  text: string;
  type: ToasterLevelType;
  isVisible: boolean;
  handleCloseNotification: () => void;
  duration: number | null;
};

const Toaster = ({ isVisible, duration, handleCloseNotification, type, text }: ToasterType) => {
  return (
    <Snackbar
      key="snackbar"
      open={isVisible}
      autoHideDuration={duration}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      onClose={handleCloseNotification}
      sx={{ mt: { sm: 9 } }}
    >
      <Alert
        severity={type}
        variant="filled"
        sx={{ width: '100%', display: 'flex', alignItems: 'center' }}
      >
        <span>{text}</span>
      </Alert>
    </Snackbar>
  );
};

export default Toaster;
