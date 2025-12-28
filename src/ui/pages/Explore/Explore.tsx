import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid2';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';

import { ExploreSubjectFragment } from '@/generated/graphql';
import { Typography } from '@/ui/components';

import { ExploreHeader, StyledPaper } from './Explore.styles';

const Explore = ({ subjects }: { subjects: ExploreSubjectFragment[] }) => {
  const { t } = useTranslation();

  return (
    <div style={{ marginTop: '16px' }}>
      <ExploreHeader>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold' }} gutterBottom>
          {t('explore.heading')}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {t('explore.subHeading')}
        </Typography>
      </ExploreHeader>

      <Grid container spacing={3}>
        {subjects.map((subject) => {
          const totalStudents = subject.courses.reduce(
            (acc, course) => acc + course.participationCount,
            0,
          );

          return (
            <Grid key={subject.id} size={{ xxs: 12, sm: 6, md: 4, lg: 3 }}>
              <Link to={`/subject/${subject.id}`} style={{ textDecoration: 'none' }}>
                <StyledPaper variant="outlined">
                  <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }} gutterBottom>
                    {subject.denomination}
                  </Typography>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {subject.courses.length > 0 && (
                      <Chip
                        label={t('courses.count', { count: subject.courses.length })}
                        size="small"
                        sx={{ width: 'fit-content' }}
                      />
                    )}
                    {subject.programs.length > 0 && (
                      <Chip
                        label={t('programs.count', { count: subject.programs.length })}
                        size="small"
                        sx={{ width: 'fit-content' }}
                      />
                    )}
                    <Chip
                      label={t('students.count', { count: totalStudents })}
                      size="small"
                      sx={{ width: 'fit-content' }}
                    />
                  </div>
                </StyledPaper>
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Explore;
