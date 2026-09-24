import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { CatalogQuery, CatalogSubjectFragment, CatalogTeacherFragment } from '@/generated/graphql';
import { Typography } from '@/ui/components';
import { PageHeader, TeacherCard, TopContentCard } from '@/ui/compositions';

import { CatalogSection } from './Catalog.styles';

type CatalogProps = {
  subjects: CatalogSubjectFragment[];
  teachers: CatalogTeacherFragment[];
  topContent: CatalogQuery['topContent']['items'];
};

const ViewAllButton = ({ to, label }: { to: string; label: string }) => (
  <div style={{ textAlign: 'center', marginTop: '24px' }}>
    <Button component={Link} to={to} variant="outlined" color="primary">
      {label}
    </Button>
  </div>
);

const Catalog = ({ subjects, teachers, topContent }: CatalogProps) => {
  const { t } = useTranslation();

  return (
    <div style={{ marginTop: '16px' }}>
      <PageHeader title={t('catalog.heading')} subtitle={t('catalog.subHeading')} />

      {subjects.length > 0 && (
        <CatalogSection>
          <Typography variant="h4" component="h2" sx={{ fontWeight: 600, mb: 2 }}>
            {t('catalog.browseBySubject')}
          </Typography>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {subjects.map((subject) => (
              <Chip
                key={subject.id}
                component={Link}
                to={`/subject/${subject.id}`}
                label={subject.denomination}
                clickable
                variant="outlined"
              />
            ))}
          </div>
        </CatalogSection>
      )}

      {teachers.length > 0 && (
        <CatalogSection>
          <Typography variant="h4" component="h2" sx={{ fontWeight: 600, mb: 2 }}>
            {t('catalog.teachersHeading')}
          </Typography>
          <Grid container spacing={3}>
            {teachers.map((teacher) => (
              <Grid
                key={teacher.id}
                size={{ xxs: 12, sm: 6, md: 4, lg: 3 }}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <TeacherCard
                  id={teacher.id}
                  firstName={teacher.first_name}
                  lastName={teacher.last_name}
                  avatarUrl={teacher.avatar_url}
                  followersCount={teacher.followersCount}
                  subjects={teacher.subjects}
                />
              </Grid>
            ))}
          </Grid>
          <ViewAllButton to="/teachers" label={t('catalog.viewAllTeachers')} />
        </CatalogSection>
      )}

      {topContent.length > 0 && (
        <CatalogSection>
          <Typography variant="h4" component="h2" sx={{ fontWeight: 600, mb: 2 }}>
            {t('catalog.topContentHeading')}
          </Typography>
          <Grid container spacing={3}>
            {topContent.map((item) => (
              <Grid
                key={`${item.__typename}-${item.id}`}
                size={{ xxs: 12, sm: 6, md: 4, lg: 3 }}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <TopContentCard item={item} />
              </Grid>
            ))}
          </Grid>
          <ViewAllButton to="/top-content" label={t('catalog.viewAllTopContent')} />
        </CatalogSection>
      )}
    </div>
  );
};

export default Catalog;
