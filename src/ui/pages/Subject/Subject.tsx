import Grid from '@mui/material/Grid2';
import { useTranslation } from 'react-i18next';

import fallbackImage from '@/assets/educatefy_background.png';
import person from '@/assets/person.png';
import { SubjectCourseFragment } from '@/generated/graphql';
import { Typography } from '@/ui/components';
import { CourseCard } from '@/ui/compositions';

import { StatsContainer, SubjectHeader } from './Subject.styles';

const Subject = ({ subject }: { subject: SubjectCourseFragment }) => {
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

      <Grid container spacing={3} sx={{ justifyContent: { xxs: 'center', sm: 'start' } }}>
        {subject.courses.map((course) => (
          <Grid key={subject.id} size="auto">
            <CourseCard
              key={course.id}
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
