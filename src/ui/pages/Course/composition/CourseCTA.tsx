import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { useMutation } from '@apollo/client/react';
import { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router';

import {
  CourseFragment,
  CourseStatus,
  HomeDocument,
  UpdateCourseStatusDocument,
} from '@/generated/graphql';
import { Button, Typography } from '@/ui/components';
import { AuthContext, ToasterContext } from '@/ui/context';
import { getFirstIncompleteComponent } from '@/ui/pages/CourseSection/utils/navigationTargets';
import type { ComponentNavigationTarget } from '@/ui/pages/CourseSection/utils/navigationTargets';
import { hasSectionContent } from '@/ui/pages/CourseSection/utils/sectionItems';
import { savePostLoginRedirectPath } from '@/utils/savePostLoginRedirectPath';

const CourseCTA = ({ course }: { course: CourseFragment }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { programSlug } = useParams();

  const {
    authModal: { setAuthModalVisibility },
    user,
  } = useContext(AuthContext);
  const { setToasterVisibility } = useContext(ToasterContext);

  const isCourseAvailable = course.status === CourseStatus.Available;
  const isEnrolled = course.status === CourseStatus.Enrolled;
  const isCourseCompleted = course.status === CourseStatus.Completed;

  const continueTarget = useMemo(
    () => getFirstIncompleteComponent(course.sections),
    [course.sections],
  );

  const [updateStatus, { loading }] = useMutation(UpdateCourseStatusDocument);

  const navigateToFirstIncomplete = (target: ComponentNavigationTarget) => {
    navigate(
      `/course/${course.slug}/section/${target.sectionId}/item/${target.itemId}/component/${target.componentId}`,
    );
  };

  const handleContinue = () => {
    if (!user) {
      savePostLoginRedirectPath(location.pathname);
      setAuthModalVisibility('login');

      return;
    }

    if (continueTarget) {
      navigateToFirstIncomplete(continueTarget);
    }
  };

  const handleStatusUpdate = async (status: CourseStatus) => {
    if (!user) {
      savePostLoginRedirectPath(location.pathname);
      setAuthModalVisibility('login');

      return;
    }

    const isEnrolling = status === CourseStatus.Enrolled;

    await updateStatus({
      variables: {
        courseStatusInput: {
          id: course.id,
          status,
          programSlug,
        },
      },
      onCompleted(data) {
        const result = data.updateCourseStatus;

        if (!result || result.errors?.length > 0) {
          setToasterVisibility({
            newDuration: 5000,
            newText: t('error.message'),
            newType: 'error',
          });

          return;
        }

        if (isEnrolling && result.success) {
          if (continueTarget) {
            navigateToFirstIncomplete(continueTarget);

            return;
          }

          const firstSection = course.sections.find(hasSectionContent);

          if (firstSection) {
            navigate(`/course/${course.slug}/section/${firstSection.id}`);
          }
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
          {continueTarget && (
            <Button variant="contained" size="large" onClick={handleContinue}>
              {t('course.continueLearning')}
            </Button>
          )}
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
