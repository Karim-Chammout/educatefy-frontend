import GroupIcon from '@mui/icons-material/Group';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import person from '@/assets/person.png';
import { Typography } from '@/ui/components';

import {
  CardActionArea,
  FollowersContainer,
  StyledAvatar,
  StyledBody,
  StyledCard,
  StyledContent,
  SubjectChip,
  SubjectsRow,
} from './TeacherCard.style';

type TeacherCardSubject = {
  id: string;
  denomination: string;
};

type TeacherCardType = {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  avatarUrl?: string | null;
  followersCount: number;
  subjects: TeacherCardSubject[];
};

const TeacherCard = ({
  id,
  firstName,
  lastName,
  avatarUrl,
  followersCount,
  subjects,
}: TeacherCardType) => {
  const { t } = useTranslation();

  const displayName = `${firstName ?? ''} ${lastName ?? ''}`.trim();

  return (
    <StyledCard variant="outlined">
      <CardActionArea LinkComponent={Link} to={`/teacher/${id}`}>
        <StyledBody>
          <StyledAvatar src={avatarUrl || person} alt={displayName || 'teacher'} />
          <StyledContent>
            <Typography
              variant="h6"
              component="h2"
              sx={{
                width: '100%',
                fontWeight: 600,
                textAlign: 'center',
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
          </StyledContent>
        </StyledBody>

        <FollowersContainer>
          <GroupIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {t('catalog.teacherFollowers', { count: followersCount })}
          </Typography>
        </FollowersContainer>
      </CardActionArea>
    </StyledCard>
  );
};

export default TeacherCard;
