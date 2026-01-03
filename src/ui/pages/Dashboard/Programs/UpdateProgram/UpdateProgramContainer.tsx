import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';

import { useEditableProgramQuery } from '@/generated/graphql';
import { Loader } from '@/ui/components';
import { ErrorPlaceholder, InfoState } from '@/ui/compositions';

import UpdateProgram from './UpdateProgram';

const UpdateProgramContainer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useEditableProgramQuery({
    variables: {
      id: id || '',
    },
  });

  if (loading) {
    return <Loader />;
  }

  if (error || !data) {
    return <ErrorPlaceholder />;
  }

  if (!data.editableProgram) {
    return (
      <InfoState
        btnLabel={t('program.backToPrograms')}
        btnOnClick={() => navigate('/dashboard/programs')}
        subtitle={t('program.notFoundSubtitle')}
        title={t('program.notFoundTitle')}
        icon={<CloseIcon />}
      />
    );
  }

  return (
    <UpdateProgram
      program={data.editableProgram}
      teacherCourses={data.teacherCourses}
      subjectsList={data.subjects}
    />
  );
};

export default UpdateProgramContainer;
