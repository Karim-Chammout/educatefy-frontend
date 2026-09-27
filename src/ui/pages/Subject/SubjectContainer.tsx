import { useQuery } from '@apollo/client/react';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { SubjectDocument } from '@/generated/graphql';
import { ErrorPlaceholder, InfoState } from '@/ui/compositions';

import Subject from './Subject';
import SubjectSkeleton from './SubjectSkeleton';

const SubjectContainer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();

  const { loading, error, data } = useQuery(SubjectDocument, {
    variables: {
      id: id || '',
    },
  });

  if (loading) {
    return <SubjectSkeleton />;
  }

  if (error || !data) {
    return <ErrorPlaceholder />;
  }

  if (!data.subject) {
    return (
      <InfoState
        title={t('subject.notFoundTitle')}
        subtitle={t('subject.notFoundSubtitle')}
        btnLabel={t('common.catalogBtnLabel')}
        btnOnClick={() => navigate('/catalog')}
        icon={<CloseIcon />}
      />
    );
  }

  return <Subject subject={data.subject} />;
};

export default SubjectContainer;
