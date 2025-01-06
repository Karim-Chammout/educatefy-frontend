import { Box, Chip, Container, Paper, Typography } from '@mui/material';
import { format } from 'date-fns';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import fallbackImage from '@/assets/background_logo.png';
import { CourseFragment, CourseStatus, useUpdateCourseStatusMutation } from '@/generated/graphql';
import { Button } from '@/ui/components';
import { AuthContext, ToasterContext } from '@/ui/context';
import { isLoggedIn } from '@/ui/layout/apolloClient';

import {
  CourseDescription,
  CourseDetails,
  CourseImage,
  CourseSubjects,
  CourseSubtitle,
  CourseTitle,
} from './Course.style';

const Course = ({ courseInfo }: { courseInfo: CourseFragment }) => {
  const { t } = useTranslation();
  const {
    authModal: { setAuthModalVisibility },
  } = useContext(AuthContext);
  const { setToasterVisibility } = useContext(ToasterContext);

  const [updateStatus, { loading }] = useUpdateCourseStatusMutation();

  const isCourseAvailable = courseInfo.status === CourseStatus.Available;

  const handleUpdateCourseStatus = async () => {
    if (!isLoggedIn()) {
      setAuthModalVisibility('login');

      return;
    }

    await updateStatus({
      variables: {
        courseStatusInput: {
          id: courseInfo.id,
          status: isCourseAvailable ? CourseStatus.Enrolled : CourseStatus.Unenrolled,
        },
      },
      onCompleted(data) {
        if (data.updateCourseStatus && data.updateCourseStatus.errors.length > 0) {
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
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <CourseImage src={courseInfo.image || fallbackImage} alt={courseInfo.denomination} />
        <Box sx={{ mt: 3 }}>
          <CourseTitle variant="h4">{courseInfo.denomination}</CourseTitle>
          <CourseSubtitle variant="subtitle1">{courseInfo.subtitle}</CourseSubtitle>
          <CourseDescription dangerouslySetInnerHTML={{ __html: courseInfo.description }} />
          <Button
            variant={isCourseAvailable ? 'contained' : 'outlined'}
            onClick={handleUpdateCourseStatus}
            disabled={loading}
          >
            {isCourseAvailable ? t('course.enroll') : t('course.unenroll')}
          </Button>
          <CourseDetails>
            <Typography variant="body2">
              <strong>Level:</strong> {courseInfo.level}
            </Typography>
            <Typography variant="body2">
              <strong>Language:</strong> {courseInfo.language}
            </Typography>
            {courseInfo.start_date && (
              <Typography variant="body2">
                <strong>Start Date:</strong> {format(new Date(courseInfo.start_date), 'PPP')}
              </Typography>
            )}
            {courseInfo.end_date && (
              <Typography variant="body2">
                <strong>End Date:</strong> {format(new Date(courseInfo.end_date), 'PPP')}
              </Typography>
            )}
            {courseInfo.external_resource_link && (
              <Typography variant="body2">
                <strong>Resource Link:</strong>{' '}
                <a href={courseInfo.external_resource_link}>{courseInfo.external_resource_link}</a>
              </Typography>
            )}
            {courseInfo.external_meeting_link && (
              <Typography variant="body2">
                <strong>Meeting Link:</strong>{' '}
                <a href={courseInfo.external_meeting_link}>{courseInfo.external_meeting_link}</a>
              </Typography>
            )}
          </CourseDetails>
          <CourseSubjects>
            {courseInfo.subjects.map((subject) => (
              <Chip key={subject.id} label={subject.denomination} />
            ))}
          </CourseSubjects>
        </Box>
      </Paper>
    </Container>
  );
};

export default Course;
