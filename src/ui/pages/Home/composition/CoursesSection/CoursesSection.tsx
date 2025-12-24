import Grid from '@mui/material/Grid2';

import fallbackImage from '@/assets/educatefy_background.png';
import person from '@/assets/person.png';
import { HomeCourseFragment } from '@/generated/graphql';
import { Typography } from '@/ui/components';
import { CourseCard } from '@/ui/compositions';

const CoursesSection = ({ title, courses }: { title: string; courses: HomeCourseFragment[] }) => {
  return (
    <div style={{ margin: '48px 0' }}>
      <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 2 }}>
        {title}
      </Typography>
      <Grid container spacing={3}>
        {courses.map((course) => (
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

export default CoursesSection;
