import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { useTeacherProgramsQuery } from '@/generated/graphql';
import { Loader } from '@/ui/components';
import { ErrorPlaceholder, InfoState } from '@/ui/compositions';

import Programs from './Programs';

const ProgramsContainer = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { loading, error, data } = useTeacherProgramsQuery();

  if (loading) {
    return <Loader />;
  }

  if (error || !data) {
    return <ErrorPlaceholder />;
  }

  if (data.teacherPrograms.length === 0) {
    return (
      <InfoState
        btnLabel={t('programs.createNewProgram')}
        btnOnClick={() => navigate('/dashboard/programs/create')}
        subtitle={t('programs.noProgramsSubtitle')}
        title={t('programs.noProgramsTitle')}
        icon={<AddCircleOutlineIcon />}
      />
    );
  }

  return <Programs programs={data.teacherPrograms} />;
};

export default ProgramsContainer;
