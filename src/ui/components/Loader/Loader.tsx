import CircularProgress from '@mui/material/CircularProgress';
import { useTranslation } from 'react-i18next';

import { Typography } from '@/ui/components';

const Loader = () => {
  const { t } = useTranslation();

  return (
    <div
      style={{
        display: 'flex',
        gap: '32px',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <CircularProgress />
      <Typography component="p" variant="h5">
        {t('ui.components.loader.label')}
      </Typography>
    </div>
  );
};

export default Loader;
