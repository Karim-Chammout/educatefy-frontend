import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { CourseSectionFragment } from '@/generated/graphql';
import { Button, Typography } from '@/ui/components';

import { SectionTitle, SectionWrapper } from '../Course.style';

const CourseSections = ({
  slug,
  sections,
}: {
  slug: string;
  sections: CourseSectionFragment[];
}) => {
  const { t } = useTranslation();

  const calculateSectionDuration = (section: CourseSectionFragment) => {
    const totalMinutes = section.items.reduce((total, item) => total + item.duration, 0);

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const parts = [];

    if (hours > 0) {
      parts.push(t('courseSection.duration.hours', { count: hours }));
    }

    if (minutes > 0) {
      parts.push(t('courseSection.duration.minutes', { count: minutes }));
    }

    if (parts.length === 0) {
      return t('courseSection.duration.minutes', { count: 0 });
    }

    return parts.join(' ');
  };

  return (
    <>
      <SectionTitle component="h3" variant="h6" gutterBottom>
        {t('course.sections')}
      </SectionTitle>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {sections.map((section) => (
          <Paper key={section.id} variant="outlined" sx={{ p: 2, flex: '1 1 auto' }}>
            <SectionWrapper>
              <div>
                <Typography variant="h6">{section.denomination}</Typography>
                <Typography variant="body2">
                  {t('courseSection.itemInfo', {
                    count: section.items.length,
                    duration: calculateSectionDuration(section),
                  })}
                </Typography>
              </div>
              <Button
                variant="outlined"
                LinkComponent={Link}
                to={`/course/${slug}/section/${section.id}`}
                startIcon={<OpenInNewIcon />}
              >
                {t('common.open')}
              </Button>
            </SectionWrapper>
          </Paper>
        ))}
      </div>
    </>
  );
};

export default CourseSections;
