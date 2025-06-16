import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';

import person from '@/assets/person.png';
import { CourseFragment, useFollowTeacherMutation } from '@/generated/graphql';
import { Button, Typography } from '@/ui/components';

import { InstructorInfoWrapper, SectionTitle } from '../Course.style';

const CourseInstructor = ({
  courseInfo,
  userId,
}: {
  courseInfo: CourseFragment;
  userId: string;
}) => {
  const { t } = useTranslation();

  const [followTeacher, { loading: updatingFollow }] = useFollowTeacherMutation();

  const handleFollowTeacher = async () => {
    await followTeacher({
      variables: {
        followTeacherInfo: {
          teacherId: courseInfo.instructor.id,
        },
      },
      update: (cache) => {
        cache.modify({
          id: cache.identify(courseInfo.instructor),
          fields: {
            isFollowed: (prev) => !prev,
          },
        });
      },
    });
  };

  return (
    <Paper variant="outlined" sx={{ p: 3, mb: 2 }}>
      <SectionTitle component="h3" variant="h6" gutterBottom>
        {t('course.instructor')}
      </SectionTitle>
      <InstructorInfoWrapper>
        <Avatar
          src={courseInfo.instructor.avatar_url || person}
          sx={{ height: '96px', width: '96px' }}
        />
        <Typography variant="h6" gutterBottom>
          {courseInfo.instructor.first_name} {courseInfo.instructor.last_name}
        </Typography>
      </InstructorInfoWrapper>
      {userId !== courseInfo.instructor.id && (
        <Button
          sx={{ my: 2 }}
          onClick={handleFollowTeacher}
          variant={courseInfo.instructor.isFollowed ? 'outlined' : 'contained'}
          disabled={updatingFollow}
        >
          {courseInfo.instructor.isFollowed ? t('instructor.unfollow') : t('instructor.follow')}
        </Button>
      )}
      {courseInfo.instructor.description && (
        <Typography dangerouslySetInnerHTML={{ __html: courseInfo.instructor.description }} />
      )}
    </Paper>
  );
};

export default CourseInstructor;
