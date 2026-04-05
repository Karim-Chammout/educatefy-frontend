import DoneIcon from '@mui/icons-material/Done';
import Alert from '@mui/material/Alert';
import DialogActions from '@mui/material/DialogActions';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router';

import {
  CourseStatus,
  ProgramFragment,
  ProgramStatus,
  useEnrollInProgramMutation,
  useUnenrollFromProgramMutation,
} from '@/generated/graphql';
import { Button, Modal } from '@/ui/components';
import { AuthContext, ToasterContext } from '@/ui/context';
import { isLoggedIn } from '@/ui/layout/apolloClient';
import { savePostLoginRedirectPath } from '@/utils/savePostLoginRedirectPath';

const ProgramCTA = ({ program }: { program: ProgramFragment }) => {
  const { t } = useTranslation();
  const location = useLocation();

  const { setToasterVisibility } = useContext(ToasterContext);
  const {
    authModal: { setAuthModalVisibility },
  } = useContext(AuthContext);

  const [isUnenrollModalOpen, setIsUnenrollModalOpen] = useState(false);

  const isEnrolled = program.status === ProgramStatus.InProgress;
  const isAvailable = program.status === ProgramStatus.NotStarted;
  const isCompleted = program.status === ProgramStatus.Completed;

  const [enrollInProgram, { loading: enrollLoading }] = useEnrollInProgramMutation();
  const [unenrollFromProgram, { loading: unenrollLoading }] = useUnenrollFromProgramMutation();

  const handleUnenrollment = async () => {
    await unenrollFromProgram({
      variables: {
        programId: program.id,
      },
      onCompleted: (data) => {
        if (!data.unenrollFromProgram?.success) {
          setToasterVisibility({
            newDuration: 5000,
            newText: t('error.message'),
            newType: 'error',
          });
        }
      },
    }).finally(() => setIsUnenrollModalOpen(false));
  };

  const handleEnrollment = async () => {
    if (!isLoggedIn()) {
      savePostLoginRedirectPath(location.pathname);
      setAuthModalVisibility('login');

      return;
    }

    await enrollInProgram({
      variables: {
        programId: program.id,
      },
      onCompleted: (data) => {
        if (!data.enrollInProgram?.success) {
          setToasterVisibility({
            newDuration: 5000,
            newText: t('error.message'),
            newType: 'error',
          });
        }
      },
    });
  };

  const enrolledCourse = program.currentVersion.courses.find(
    (c) => c.status === CourseStatus.Enrolled,
  );
  const availableCourse = program.currentVersion.courses.find(
    (c) => c.status === CourseStatus.Available,
  );

  return (
    <>
      {isAvailable && (
        <Button size="large" onClick={handleEnrollment} disabled={enrollLoading}>
          {t('content.enroll')}
        </Button>
      )}
      {isEnrolled && (
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Button
            size="large"
            variant="outlined"
            onClick={() => setIsUnenrollModalOpen(true)}
            disabled={unenrollLoading}
          >
            {t('content.unenroll')}
          </Button>
          {(enrolledCourse || availableCourse) && (
            <Button
              size="large"
              LinkComponent={Link}
              to={`/program/${program.slug}/course/${enrolledCourse?.slug || availableCourse?.slug}`}
            >
              {enrolledCourse ? t('program.continueLearning') : t('program.startFirstCourse')}
            </Button>
          )}
          <Modal
            open={isUnenrollModalOpen}
            onClose={() => setIsUnenrollModalOpen(false)}
            title={t('program.unenrollConfirmation')}
            maxWidth="xs"
            CTAs={
              <DialogActions>
                <Button variant="outlined" onClick={() => setIsUnenrollModalOpen(false)} fullWidth>
                  {t('common.cancel')}
                </Button>
                <Button onClick={handleUnenrollment} disabled={unenrollLoading} fullWidth>
                  {t('common.confirm')}
                </Button>
              </DialogActions>
            }
          />
        </div>
      )}
      {isCompleted && (
        <Alert
          icon={<DoneIcon fontSize="inherit" />}
          severity="success"
          variant="filled"
          sx={{ width: 'fit-content' }}
        >
          {t('program.completed')}
        </Alert>
      )}
    </>
  );
};

export default ProgramCTA;
