import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';

import { ToasterContext } from '@/ui/context';
import { PERMISSION_DENIED } from '@/utils/constants';

import Explore from './Explore';

const ExploreContainer = () => {
  const location = useLocation();
  const { setToasterVisibility } = useContext(ToasterContext);
  const { t } = useTranslation();

  useEffect(() => {
    // Display a toaster when a user tries to access a page without permissions
    if (location.state?.action === PERMISSION_DENIED) {
      setToasterVisibility({
        newDuration: 5000,
        newType: 'error',
        newText: t('explore.permissionDenied'),
      });
    }
  }, [location.state?.action]);

  return (
    <div>
      <Explore />
    </div>
  );
};

export default ExploreContainer;
