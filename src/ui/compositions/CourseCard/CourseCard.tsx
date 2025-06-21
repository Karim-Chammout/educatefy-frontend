import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Avatar from '@mui/material/Avatar';
import CardMedia from '@mui/material/CardMedia';
import { Link } from 'react-router';

import { CourseLevel } from '@/generated/graphql';
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
} from './CourseCard.style';

type CourseCardType = {
  title: string;
  slug: string;
  teacherName: string;
  teacherAvatar: string;
  image: string;
  difficulty: CourseLevel;
  rating: number;
  studentsCount: number;
};

const CourseCard = ({
  title,
  slug,
  teacherName,
  teacherAvatar,
  image,
  difficulty,
  rating,
  studentsCount,
}: CourseCardType) => {
  return (
    <StyledCard variant="outlined">
      <CardActionArea LinkComponent={Link} to={`/course/${slug}`}>
        <StyledMediaWrapper>
          <CardMedia component="img" loading="lazy" height="200" image={image} alt={title} />
        </StyledMediaWrapper>

        <StyledCardContent>
          <MetadataContainer>
            <DifficultyChip difficulty={difficulty} label={difficulty} size="small" />
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

export default CourseCard;
