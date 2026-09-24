import { useQuery } from '@apollo/client/react';
import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';

import { CatalogDocument } from '@/generated/graphql';
import { ErrorPlaceholder } from '@/ui/compositions';
import { ToasterContext } from '@/ui/context';
import { PERMISSION_DENIED } from '@/utils/constants';

import Catalog from './Catalog';
import CatalogSkeleton from './CatalogSkeleton';

const TEACHERS_BLOCK_SIZE = 4;
const TOP_CONTENT_BLOCK_SIZE = 8;

const CatalogContainer = () => {
  const location = useLocation();
  const { setToasterVisibility } = useContext(ToasterContext);
  const { t } = useTranslation();

  const { loading, error, data } = useQuery(CatalogDocument, {
    variables: {
      teachersFirst: TEACHERS_BLOCK_SIZE,
      topContentFirst: TOP_CONTENT_BLOCK_SIZE,
    },
  });

  useEffect(() => {
    // Display a toaster when a user tries to access a page without permissions
    if (location.state?.action === PERMISSION_DENIED) {
      setToasterVisibility({
        newDuration: 5000,
        newType: 'error',
        newText: t('catalog.permissionDenied'),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state?.action]);

  if (loading) {
    return <CatalogSkeleton />;
  }

  if (error || !data) {
    return <ErrorPlaceholder />;
  }

  return (
    <Catalog
      subjects={data.subjectsWithLinkedContent}
      teachers={data.teachers.items}
      topContent={data.topContent.items}
    />
  );
};

export default CatalogContainer;
