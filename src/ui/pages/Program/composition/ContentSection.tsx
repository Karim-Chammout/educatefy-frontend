import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';

import fallbackImage from '@/assets/educatefy_background.png';
import person from '@/assets/person.png';
import { ProgramFragment } from '@/generated/graphql';
import { Typography } from '@/ui/components';
import { ContentCard } from '@/ui/compositions';

import { SectionTitle } from '../Program.styles';

const ContentSection = ({ program }: { program: ProgramFragment }) => {
  const { t } = useTranslation();

  return (
    <Paper variant="outlined" sx={{ p: 3, mb: 2 }}>
      <SectionTitle component="h3" variant="h6" gutterBottom>
        {t('common.content')}
      </SectionTitle>
      {program.courses.length > 0 ? (
        <Grid container spacing={3}>
          {program.courses.map((course) => (
            <Grid
              key={course.id}
              size={{ xxs: 12, sm: 6, md: 4, lg: 3 }}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <ContentCard
                type="course"
                title={course.denomination}
                linkPath={`/program/${program.slug}/course/${course.slug}`}
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
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '40px 0',
          }}
        >
          <HourglassEmptyIcon sx={{ fontSize: '128px' }} />
          <Typography variant="h5" sx={{ my: 1 }}>
            {t('program.noCoursesYet')}
          </Typography>
          <Typography>{t('program.noCoursesSubtitle')}</Typography>
        </div>
      )}
    </Paper>
  );
};

export default ContentSection;
