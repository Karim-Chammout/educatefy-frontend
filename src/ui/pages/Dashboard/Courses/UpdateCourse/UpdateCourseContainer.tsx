import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useParams } from 'react-router';

import { useEditableCourseQuery } from '@/generated/graphql';
import { Loader } from '@/ui/components';
import { ErrorPlaceholder, InfoState } from '@/ui/compositions';

import UpdateCourse from './UpdateCourse';

const UpdateCourseContainer = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useEditableCourseQuery({
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

  if (!data.editableCourse) {
    return (
      <InfoState
        btnLabel="Back to Courses"
        btnOnClick={() => navigate('/dashboard/courses')}
        subtitle="The course you are looking for does not exist."
        title="Course not found"
        icon={<CloseIcon />}
      />
    );
  }

  return <UpdateCourse course={data.editableCourse} languages={data.languages} />;
};

export default UpdateCourseContainer;
