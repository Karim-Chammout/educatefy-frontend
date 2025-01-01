import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';

import { useExploreQuery } from '@/generated/graphql';
import { Loader } from '@/ui/components';
import { ErrorPlaceholder } from '@/ui/compositions';
import { ToasterContext } from '@/ui/context';
import { PERMISSION_DENIED } from '@/utils/constants';

import Explore from './Explore';

const ExploreContainer = () => {
  const location = useLocation();
  const { setToasterVisibility } = useContext(ToasterContext);
  const { t } = useTranslation();
  const { loading, error, data } = useExploreQuery();

  useEffect(() => {
    // Display a toaster when a user tries to access a page without permissions
    if (location.state?.action === PERMISSION_DENIED) {
      setToasterVisibility({
        newDuration: 5000,
        newType: 'error',
        newText: t('explore.permissionDenied'),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state?.action]);

  if (loading) {
    return <Loader />;
  }

  if (error || !data || !data.subjectsListWithLinkedCourses) {
    return <ErrorPlaceholder />;
  }

  return (
    <div>
      <Explore subjects={data.subjectsListWithLinkedCourses} />
    </div>
  );
};

export default ExploreContainer;
