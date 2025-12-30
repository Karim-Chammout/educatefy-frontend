import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { useProgramQuery } from '@/generated/graphql';
import { Loader } from '@/ui/components';
import { ErrorPlaceholder, InfoState } from '@/ui/compositions';

import Program from './Program';

const ProgramContainer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { programSlug } = useParams();

  const { loading, error, data } = useProgramQuery({
    variables: {
      slug: programSlug || '',
    },
  });

  if (loading) {
    return <Loader />;
  }

  if (error || !data) {
    return <ErrorPlaceholder />;
  }

  if (!data.program) {
    return (
      <InfoState
        title={t('program.notFoundTitle')}
        subtitle={t('program.notFoundSubtitle')}
        btnLabel={t('common.exploreBtnLabel')}
        btnOnClick={() => navigate('/explore')}
        icon={<CloseIcon />}
      />
    );
  }

  return <Program program={data.program} />;
};

export default ProgramContainer;
