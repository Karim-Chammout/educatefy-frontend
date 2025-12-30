import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';

import person from '@/assets/person.png';
import { ProgramFragment, useFollowTeacherMutation } from '@/generated/graphql';
import { Button, Typography } from '@/ui/components';

import { InstructorInfoWrapper, SectionTitle } from '../Program.styles';

const ProgramInstructor = ({ program }: { program: ProgramFragment }) => {
  const { t } = useTranslation();
  const { id, first_name, last_name, description, avatar_url, isFollowed, isAllowedToFollow } =
    program.instructor;

  const [followTeacher, { loading: updatingFollow }] = useFollowTeacherMutation();

  const handleFollowTeacher = async () => {
    await followTeacher({
      variables: {
        followTeacherInfo: {
          teacherId: id,
        },
      },
      update: (cache) => {
        cache.modify({
          id: cache.identify(program.instructor),
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
      <InstructorInfoWrapper to={`/teacher/${id}`}>
        <Avatar src={avatar_url || person} sx={{ height: '96px', width: '96px' }} />
        <Typography variant="h6" gutterBottom>
          {first_name} {last_name}
        </Typography>
      </InstructorInfoWrapper>
      {isAllowedToFollow && (
        <Button
          sx={{ my: 2, display: 'block' }}
          onClick={handleFollowTeacher}
          variant={isFollowed ? 'outlined' : 'contained'}
          disabled={updatingFollow}
        >
          {isFollowed ? t('instructor.unfollow') : t('instructor.follow')}
        </Button>
      )}
      {description && <Typography dangerouslySetInnerHTML={{ __html: description }} />}
    </Paper>
  );
};

export default ProgramInstructor;
