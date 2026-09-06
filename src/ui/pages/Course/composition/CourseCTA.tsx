import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { useMutation } from '@apollo/client/react';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router';

import {
  CourseFragment,
  CourseStatus,
  HomeDocument,
  UpdateCourseStatusDocument,
} from '@/generated/graphql';
import { Button, Typography } from '@/ui/components';
import { AuthContext, ToasterContext } from '@/ui/context';
import { savePostLoginRedirectPath } from '@/utils/savePostLoginRedirectPath';

const CourseCTA = ({ course }: { course: CourseFragment }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const { programSlug } = useParams();

  const {
    authModal: { setAuthModalVisibility },
    user,
  } = useContext(AuthContext);
  const { setToasterVisibility } = useContext(ToasterContext);

  const isCourseAvailable = course.status === CourseStatus.Available;
  const isEnrolled = course.status === CourseStatus.Enrolled;
  const isCourseCompleted = course.status === CourseStatus.Completed;

  const [updateStatus, { loading }] = useMutation(UpdateCourseStatusDocument);

  const handleStatusUpdate = async (status: CourseStatus) => {
    if (!user) {
      savePostLoginRedirectPath(location.pathname);
      setAuthModalVisibility('login');

      return;
    }

    await updateStatus({
      variables: {
        courseStatusInput: {
          id: course.id,
          status,
          programSlug,
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
    const status = isCourseAvailable ? CourseStatus.Enrolled : CourseStatus.Unenrolled;

    await handleStatusUpdate(status);
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
          {t('content.enroll')}
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
            {t('content.unenroll')}
          </Button>
        </div>
      )}

      {isCourseCompleted && (
        <Alert severity="success" variant="filled" sx={{ alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {t('course.completedTitle')}
            </Typography>
            <Typography variant="body2">{t('course.completedSubtitle')}</Typography>
          </Box>
        </Alert>
      )}
    </div>
  );
};

export default CourseCTA;
