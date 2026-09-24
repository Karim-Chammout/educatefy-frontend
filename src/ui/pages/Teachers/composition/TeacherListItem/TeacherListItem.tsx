import { useMutation } from '@apollo/client/react';
import GroupIcon from '@mui/icons-material/Group';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import person from '@/assets/person.png';
import { FollowTeacherDocument } from '@/generated/graphql';
import { Button, Typography } from '@/ui/components';

import {
  CardActionArea,
  FollowersRow,
  StyledAvatar,
  StyledCard,
  StyledContent,
  StyledFollowAction,
  StyledRow,
  SubjectChip,
  SubjectsRow,
} from './TeacherListItem.style';

type TeacherListItemSubject = {
  id: string;
  denomination: string;
};

type TeacherListItemProps = {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  avatarUrl?: string | null;
  bio?: string | null;
  isFollowed: boolean;
  isAllowedToFollow: boolean;
  followersCount: number;
  subjects: TeacherListItemSubject[];
};

const TeacherListItem = ({
  id,
  firstName,
  lastName,
  avatarUrl,
  bio,
  isFollowed,
  isAllowedToFollow,
  followersCount,
  subjects,
}: TeacherListItemProps) => {
  const { t } = useTranslation();

  const [followTeacher, { loading: updatingFollow }] = useMutation(FollowTeacherDocument);

  const displayName = `${firstName ?? ''} ${lastName ?? ''}`.trim();

  const handleFollowTeacher = async () => {
    await followTeacher({
      variables: {
        followTeacherInfo: { teacherId: id },
      },
      update: (cache, { data }) => {
        const isFollowing = data?.followTeacher?.isFollowing;

        if (isFollowing === undefined || isFollowing === null) {
          return;
        }

        cache.modify({
          id: cache.identify({ __typename: 'Teacher', id }),
          fields: {
            isFollowed: () => isFollowing,
            followersCount: (current: number) => Math.max(0, current + (isFollowing ? 1 : -1)),
          },
        });
      },
    });
  };

  return (
    <StyledCard variant="outlined">
      <StyledRow>
        <CardActionArea LinkComponent={Link} to={`/teacher/${id}`}>
          <StyledAvatar src={avatarUrl || person} alt={displayName || 'teacher'} />
          <StyledContent>
            <Typography
              variant="h6"
              component="h2"
              sx={{
                width: '100%',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {displayName}
            </Typography>

            <SubjectsRow>
              {subjects.map((subject) => (
                <SubjectChip
                  key={subject.id}
                  label={subject.denomination}
                  size="small"
                  variant="outlined"
                />
              ))}
            </SubjectsRow>

            {bio && (
              <Typography
                variant="body2"
                color="grey.600"
                sx={{
                  width: '100%',
                  fontStyle: 'italic',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  lineHeight: 1.45,
                }}
              >
                {bio}
              </Typography>
            )}

            <FollowersRow>
              <GroupIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                {t('catalog.teacherFollowers', { count: followersCount })}
              </Typography>
            </FollowersRow>
          </StyledContent>
        </CardActionArea>

        {isAllowedToFollow && (
          <StyledFollowAction>
            <Button
              size="small"
              variant={isFollowed ? 'outlined' : 'contained'}
              startIcon={isFollowed ? <PersonRemoveIcon /> : <PersonAddAlt1Icon />}
              onClick={handleFollowTeacher}
              disabled={updatingFollow}
            >
              {isFollowed ? t('instructor.unfollow') : t('instructor.follow')}
            </Button>
          </StyledFollowAction>
        )}
      </StyledRow>
    </StyledCard>
  );
};

export default TeacherListItem;
