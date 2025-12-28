import Grid from '@mui/material/Grid2';
import { useTranslation } from 'react-i18next';

import fallbackImage from '@/assets/educatefy_background.png';
import person from '@/assets/person.png';
import { SubjectContentFragment } from '@/generated/graphql';
import { Typography } from '@/ui/components';
import { CourseCard } from '@/ui/compositions';

import { StatsContainer, SubjectHeader } from './Subject.styles';

const Subject = ({ subject }: { subject: SubjectContentFragment }) => {
  const { t } = useTranslation();

  const averageRating =
    subject.courses.reduce((acc, course) => acc + course.rating, 0) / subject.courses.length;
  const totalStudents = subject.courses.reduce((acc, course) => acc + course.participationCount, 0);

  return (
    <div style={{ marginTop: '16px' }}>
      <SubjectHeader>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
          {subject.denomination}
        </Typography>

        <StatsContainer>
          {subject.programs.length > 0 && (
            <div>
              <Typography
                variant="h4"
                component="span"
                sx={{ fontWeight: 'bold', color: 'primary.main' }}
              >
                {subject.programs.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t('subject.programsAvailable')}
              </Typography>
            </div>
          )}

          {subject.courses.length > 0 && (
            <div>
              <Typography
                variant="h4"
                component="span"
                sx={{ fontWeight: 'bold', color: 'primary.main' }}
              >
                {subject.courses.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t('subject.coursesAvailable')}
              </Typography>
            </div>
          )}

          {averageRating > 0 && (
            <div>
              <Typography
                variant="h4"
                component="span"
                sx={{ fontWeight: 'bold', color: 'primary.main' }}
              >
                {averageRating.toFixed(1)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t('averageRating')}
              </Typography>
            </div>
          )}

          <div>
            <Typography
              variant="h4"
              component="span"
              sx={{ fontWeight: 'bold', color: 'primary.main' }}
            >
              {totalStudents}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('subject.totalStudents')}
            </Typography>
          </div>
        </StatsContainer>
      </SubjectHeader>

      <Grid container spacing={3}>
        {subject.courses.map((course) => (
          <Grid
            key={course.id}
            size={{ xxs: 12, sm: 6, md: 4, lg: 3 }}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <CourseCard
              title={course.denomination}
              slug={course.slug}
              teacherName={`${course.instructor.first_name} ${course.instructor.last_name}`}
              teacherAvatar={course.instructor.avatar_url || person}
              image={course.image || fallbackImage}
              difficulty={course.level}
              rating={course.rating}
              studentsCount={course.participationCount}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Subject;
