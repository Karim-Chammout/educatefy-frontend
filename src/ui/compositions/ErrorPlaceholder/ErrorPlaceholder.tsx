import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import InfoState from '../InfoState';

const ErrorPlaceholder = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <InfoState
      btnLabel={t('errorPlaceholder.exploreBtnLabel')}
      btnOnClick={() => navigate('/explore')}
      icon={<ErrorOutlineRoundedIcon />}
      title={t('errorPlaceholder.title')}
      subtitle={t('errorPlaceholder.subtitle')}
    />
  );
};

export default ErrorPlaceholder;
