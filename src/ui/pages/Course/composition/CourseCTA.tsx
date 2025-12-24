import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';

import {
  CourseFragment,
  CourseStatus,
  HomeDocument,
  useUpdateCourseStatusMutation,
} from '@/generated/graphql';
import { Button } from '@/ui/components';
import { AuthContext, ToasterContext } from '@/ui/context';
import { isLoggedIn } from '@/ui/layout/apolloClient';
import { savePostLoginRedirectPath } from '@/utils/savePostLoginRedirectPath';

const CourseCTA = ({ course }: { course: CourseFragment }) => {
  const { t } = useTranslation();
  const location = useLocation();

  const {
    authModal: { setAuthModalVisibility },
  } = useContext(AuthContext);
  const { setToasterVisibility } = useContext(ToasterContext);

  const isCourseAvailable = course.status === CourseStatus.Available;
  const isEnrolled = course.status === CourseStatus.Enrolled;
  const isCourseCompleted = course.status === CourseStatus.Completed;

  const [updateStatus, { loading }] = useUpdateCourseStatusMutation();

  const handleStatusUpdate = async (status: CourseStatus) => {
    if (!isLoggedIn()) {
      savePostLoginRedirectPath(location.pathname);
      setAuthModalVisibility('login');

      return;
    }

    await updateStatus({
      variables: {
        courseStatusInput: {
          id: course.id,
          status,
        },
      },
      onCompleted(data) {
        if (data.updateCourseStatus && data.updateCourseStatus?.errors?.length > 0) {
          setToasterVisibility({
            newDuration: 5000,
            newText: t('error.message'),
            newType: 'error',
          });
        }
      },
      onError() {
        setToasterVisibility({
          newDuration: 5000,
          newText: t('error.message'),
          newType: 'error',
        });
      },
      refetchQueries: [{ query: HomeDocument }],
    });
  };

  const handleUpdateCourseStatus = async () => {
    const status =
      isCourseAvailable || isCourseCompleted ? CourseStatus.Enrolled : CourseStatus.Unenrolled;

    await handleStatusUpdate(status);
  };

  const handleCompleteCourse = async () => {
    await handleStatusUpdate(CourseStatus.Completed);
  };

  return (
    <div>
      {isCourseAvailable && (
        <Button
          variant="contained"
          size="large"
          onClick={handleUpdateCourseStatus}
          disabled={loading}
        >
          {t('course.enroll')}
        </Button>
      )}

      {isEnrolled && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          <Button
            variant="outlined"
            size="large"
            onClick={handleUpdateCourseStatus}
            disabled={loading}
          >
            {t('course.unenroll')}
          </Button>
          <Button
            variant="contained"
            size="large"
            color="success"
            onClick={handleCompleteCourse}
            disabled={loading}
          >
            {t('course.markCompleted')}
          </Button>
        </div>
      )}

      {isCourseCompleted && (
        <Button
          variant="contained"
          size="large"
          onClick={handleUpdateCourseStatus}
          disabled={loading}
        >
          {t('course.retake')}
        </Button>
      )}
    </div>
  );
};

export default CourseCTA;
