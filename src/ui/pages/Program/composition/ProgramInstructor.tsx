import { useApolloClient, useMutation } from '@apollo/client/react';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';

import person from '@/assets/person.png';
import { FollowTeacherDocument, ProgramFragment } from '@/generated/graphql';
import { Button, Typography } from '@/ui/components';
import { RichTextContent } from '@/ui/compositions';
import { applyFollowTeacherResult } from '@/utils/followTeacherCache';
import { getTeacherPath } from '@/utils/getTeacherPath';
import { hasRichTextContent } from '@/utils/hasRichTextContent';

import { InstructorInfoWrapper, SectionTitle } from '../Program.styles';

const ProgramInstructor = ({ program }: { program: ProgramFragment }) => {
  const { t } = useTranslation();
  const { id, first_name, last_name, description, avatar_url, isFollowed, isAllowedToFollow } =
    program.instructor;
  const client = useApolloClient();

  const [followTeacher, { loading: updatingFollow }] = useMutation(FollowTeacherDocument);

  const handleFollowTeacher = async () => {
    const { data } = await followTeacher({
      variables: {
        followTeacherInfo: {
          teacherId: id,
        },
      },
    });

    applyFollowTeacherResult(client, id, data?.followTeacher);
  };

  return (
    <Paper variant="outlined" sx={{ p: 3, mb: 2 }}>
      <SectionTitle component="h3" variant="h6" gutterBottom>
        {t('program.instructor')}
      </SectionTitle>
      <InstructorInfoWrapper to={getTeacherPath(id)}>
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
      {hasRichTextContent(description) && <RichTextContent value={description} />}
    </Paper>
  );
};

export default ProgramInstructor;
