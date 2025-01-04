import { Box, Chip, Container, Paper, Typography } from '@mui/material';
import { format } from 'date-fns';

import fallbackImage from '@/assets/background_logo.png';
import { CourseFragment } from '@/generated/graphql';

import {
  CourseDescription,
  CourseDetails,
  CourseImage,
  CourseSubjects,
  CourseSubtitle,
  CourseTitle,
} from './Course.style';

const Course = ({ courseInfo }: { courseInfo: CourseFragment }) => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <CourseImage src={courseInfo.image || fallbackImage} alt={courseInfo.denomination} />
        <Box sx={{ mt: 3 }}>
          <CourseTitle variant="h4">{courseInfo.denomination}</CourseTitle>
          <CourseSubtitle variant="subtitle1">{courseInfo.subtitle}</CourseSubtitle>
          <CourseDescription dangerouslySetInnerHTML={{ __html: courseInfo.description }} />
          <CourseDetails>
            <Typography variant="body2">
              <strong>Level:</strong> {courseInfo.level}
            </Typography>
            <Typography variant="body2">
              <strong>Language:</strong> {courseInfo.language}
            </Typography>
            <Typography variant="body2">
              <strong>Start Date:</strong> {format(new Date(courseInfo.start_date), 'PPP')}
            </Typography>
            <Typography variant="body2">
              <strong>End Date:</strong> {format(new Date(courseInfo.end_date), 'PPP')}
            </Typography>
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
