import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import InfoState from '../InfoState';

type ErrorPlaceholderProps = {
  onRetry?: () => void;
};

const ErrorPlaceholder = ({ onRetry }: ErrorPlaceholderProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleBtnClick = () => {
    if (onRetry) {
      onRetry();
    } else {
      navigate('/catalog');
    }
  };

  return (
    <InfoState
      btnLabel={onRetry ? t('errorPlaceholder.retryBtnLabel') : t('common.catalogBtnLabel')}
      btnOnClick={handleBtnClick}
      icon={<ErrorOutlineRoundedIcon />}
      title={t('errorPlaceholder.title')}
      subtitle={t('errorPlaceholder.subtitle')}
    />
  );
};

export default ErrorPlaceholder;
