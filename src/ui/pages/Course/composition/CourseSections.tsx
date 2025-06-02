import { Paper, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { CourseSectionFragment } from '@/generated/graphql';
import { Button } from '@/ui/components';

import { SectionTitle } from '../Course.style';

const CourseSections = ({
  slug,
  sections,
}: {
  slug: string;
  sections: CourseSectionFragment[];
}) => {
  const { t } = useTranslation();

  return (
    <>
      <SectionTitle component="h3" variant="h6" gutterBottom>
        Curriculum{/* 🚨 TRANSLATIONS 🚨 */}
      </SectionTitle>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {sections.map((section) => (
          <Paper key={section.id} variant="outlined" sx={{ p: 2, flex: '1 1 auto' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '16px',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6">{section.denomination}</Typography>
              <Button
                variant="outlined"
                LinkComponent={Link}
                to={`/course/${slug}/section/${section.id}`}
              >
                {t('common.open')}
              </Button>
            </div>
          </Paper>
        ))}
      </div>
    </>
  );
};

export default CourseSections;
