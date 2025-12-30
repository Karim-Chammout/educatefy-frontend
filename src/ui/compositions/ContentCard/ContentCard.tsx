import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Avatar from '@mui/material/Avatar';
import CardMedia from '@mui/material/CardMedia';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { CourseLevel, ProgramLevel } from '@/generated/graphql';
import { Typography } from '@/ui/components';

import {
  CardActionArea,
  DifficultyChip,
  MetadataContainer,
  StarIcon,
  Statistic,
  StatsContainer,
  StyledCard,
  StyledCardContent,
  StyledMediaWrapper,
  TeacherContainer,
} from './ContentCard.style';

type ContentCardType = {
  type: 'course' | 'program';
  title: string;
  linkPath: string;
  teacherName: string;
  teacherAvatar: string;
  image: string;
  rating: number;
  studentsCount: number;
  difficulty: CourseLevel | ProgramLevel;
  coursesCount?: number;
};

const ContentCard = ({
  type,
  title,
  linkPath,
  image,
  rating,
  studentsCount,
  teacherAvatar,
  teacherName,
  difficulty,
  coursesCount,
}: ContentCardType) => {
  const { t } = useTranslation();

  return (
    <StyledCard variant="outlined" contentType={type}>
      <CardActionArea LinkComponent={Link} to={linkPath}>
        <StyledMediaWrapper>
          <CardMedia component="img" loading="lazy" height="200" image={image} alt={title} />
        </StyledMediaWrapper>

        <StyledCardContent>
          <MetadataContainer>
            {type === 'course' ? (
              <DifficultyChip difficulty={difficulty} label={difficulty} size="small" />
            ) : (
              <div style={{ display: 'flex', gap: '8px' }}>
                <DifficultyChip difficulty={difficulty} label={difficulty} size="small" />
                <DifficultyChip
                  difficulty={CourseLevel.Beginner}
                  label={t('courses.count', { count: coursesCount })}
                  size="small"
                  isProgramChip
                />
              </div>
            )}
            <StatsContainer>
              <Statistic>
                <PersonOutlineIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {studentsCount}
                </Typography>
              </Statistic>
              {rating > 0 && (
                <Statistic>
                  <StarIcon />
                  <Typography variant="body2" color="text.secondary">
                    {rating.toFixed(1)}
                  </Typography>
                </Statistic>
              )}
            </StatsContainer>
          </MetadataContainer>

          <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>

          <TeacherContainer>
            <Avatar src={teacherAvatar} alt={teacherName} sx={{ width: 24, height: 24 }} />
            <Typography variant="body2" color="primary" sx={{ fontWeight: 500 }}>
              {teacherName}
            </Typography>
          </TeacherContainer>
        </StyledCardContent>
      </CardActionArea>
    </StyledCard>
  );
};

export default ContentCard;
