import GroupIcon from '@mui/icons-material/Group';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import SchoolIcon from '@mui/icons-material/School';
import StarIcon from '@mui/icons-material/Star';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

import fallbackImage from '@/assets/educatefy_background.png';
import person from '@/assets/person.png';
import { TeacherFragment, useFollowTeacherMutation } from '@/generated/graphql';
import { Button, Typography } from '@/ui/components';
import { CourseCard } from '@/ui/compositions';

import { HeaderSection, InstructorInfo, StatCard, StatContent, StatIcon } from './Instructor.style';

const Instructor = ({ instructor }: { instructor: TeacherFragment }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [followTeacher, { loading: updatingFollow }] = useFollowTeacherMutation();

  const handleFollowTeacher = async () => {
    await followTeacher({
      variables: {
        followTeacherInfo: {
          teacherId: instructor.id,
        },
      },
      update: (cache) => {
        cache.modify({
          id: cache.identify(instructor),
          fields: {
            isFollowed: (prev) => !prev,
          },
        });
      },
    });
  };

  const totalStudents = instructor.courses.reduce(
    (sum, course) => sum + course.participationCount,
    0,
  );

  const averageRating =
    instructor.courses.length > 0
      ? instructor.courses.reduce((sum, course) => sum + course.rating, 0) /
        instructor.courses.length
      : 0;

  const courseCount = instructor.courses.length;

  return (
    <div style={{ marginTop: '16px' }}>
      <HeaderSection variant="outlined" sx={{ p: 3, mb: 3 }}>
        <Avatar
          src={instructor.avatar_url || undefined}
          alt={`${instructor.first_name} ${instructor.last_name}`}
          sx={{
            width: 120,
            height: 120,
            border: `4px solid ${theme.palette.background.paper}`,
            boxShadow: theme.shadows[8],
          }}
        />

        <InstructorInfo>
          <Typography variant="h3" component="h1" sx={{ fontWeight: 700 }}>
            {instructor.first_name} {instructor.last_name}
          </Typography>

          {instructor.isAllowedToFollow && (
            <div>
              <Button
                variant={instructor.isFollowed ? 'outlined' : 'contained'}
                startIcon={instructor.isFollowed ? <PersonRemoveIcon /> : <PersonAddAlt1Icon />}
                onClick={handleFollowTeacher}
                disabled={updatingFollow}
              >
                {instructor.isFollowed ? t('instructor.unfollow') : t('instructor.follow')}
              </Button>
            </div>
          )}
        </InstructorInfo>
      </HeaderSection>

      <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
            {t('account.bio')}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            {instructor.bio}
          </Typography>
        </Box>

        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
            {t('account.about')}
          </Typography>
          <Typography dangerouslySetInnerHTML={{ __html: instructor.description || '' }} />
        </Box>
      </Paper>

      <Box sx={{ mb: 3 }}>
        <Grid container spacing={3}>
          <Grid size={{ xxs: 12, sm: 4 }}>
            <StatCard variant="outlined">
              <StatIcon>
                <SchoolIcon sx={{ fontSize: 32, color: 'primary.main' }} />
              </StatIcon>
              <StatContent>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary' }}>
                  {courseCount}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('instructor.courses', {
                    count: courseCount,
                  })}
                </Typography>
              </StatContent>
            </StatCard>
          </Grid>

          <Grid size={{ xxs: 12, sm: 4 }}>
            <StatCard variant="outlined">
              <StatIcon>
                <GroupIcon sx={{ fontSize: 32, color: 'success.main' }} />
              </StatIcon>
              <StatContent>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary' }}>
                  {totalStudents}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('instructor.sutdents', {
                    count: totalStudents,
                  })}
                </Typography>
              </StatContent>
            </StatCard>
          </Grid>

          <Grid size={{ xxs: 12, sm: 4 }}>
            <StatCard variant="outlined">
              <StatIcon>
                <StarIcon sx={{ fontSize: 32, color: 'warning.main' }} />
              </StatIcon>
              <StatContent>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary' }}>
                  {averageRating > 0 ? averageRating.toFixed(1) : '—'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('averageRating')}
                </Typography>
              </StatContent>
            </StatCard>
          </Grid>
        </Grid>
      </Box>

      {instructor.courses.length > 0 && (
        <>
          <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 3 }}>
            {t('course.coursesBy', {
              name: instructor.first_name,
            })}
          </Typography>

          <Grid container spacing={3} sx={{ justifyContent: { xxs: 'center', sm: 'start' } }}>
            {instructor.courses.map((course) => (
              <Grid key={course.id} size="auto">
                <CourseCard
                  title={course.denomination}
                  slug={course.slug}
                  teacherName={`${instructor.first_name} ${instructor.last_name}`}
                  teacherAvatar={instructor.avatar_url || person}
                  image={course.image || fallbackImage}
                  difficulty={course.level}
                  rating={course.rating}
                  studentsCount={course.participationCount}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default Instructor;
