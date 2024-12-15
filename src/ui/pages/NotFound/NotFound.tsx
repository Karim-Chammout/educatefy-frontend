import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { InfoState } from '@/ui/compositions';

const NotFound = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <InfoState
      btnLabel={t('notFound.exploreBtnLabel')}
      btnOnClick={() => navigate('/explore')}
      icon={<ErrorOutlineRoundedIcon />}
      title={t('notFound.title')}
      subtitle={t('notFound.subtitle')}
    />
  );
};

export default NotFound;
