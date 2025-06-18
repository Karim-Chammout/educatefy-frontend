import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { useCourseQuery } from '@/generated/graphql';
import { Loader } from '@/ui/components';
import { ErrorPlaceholder, InfoState } from '@/ui/compositions';

import Course from './Course';

const CourseContainer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { slug } = useParams();

  const { loading, error, data } = useCourseQuery({
    variables: {
      slug: slug || '',
    },
  });

  if (loading) {
    return <Loader />;
  }

  if (error || !data) {
    return <ErrorPlaceholder />;
  }

  if (!data.course) {
    return (
      <InfoState
        title={t('course.notFoundTitle')}
        subtitle={t('course.notFoundSubtitle')}
        btnLabel={t('common.exploreBtnLabel')}
        btnOnClick={() => navigate('/explore')}
        icon={<CloseIcon />}
      />
    );
  }

  return <Course courseInfo={data.course} />;
};

export default CourseContainer;
