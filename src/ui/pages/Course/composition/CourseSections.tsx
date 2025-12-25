import { useTranslation } from 'react-i18next';

import { CourseSectionFragment } from '@/generated/graphql';
import { Typography } from '@/ui/components';

import { SectionTitle } from '../Course.style';
import { SectionCard } from './SectionCard';

const CourseSections = ({ sections }: { sections: CourseSectionFragment[] }) => {
  const { t } = useTranslation();

  const totalNumberOfLectures = sections.reduce(
    (total, section) => total + section.items.length,
    0,
  );

  const totalDurationInMinutes = sections.reduce(
    (total, section) =>
      total + section.items.reduce((secTotal, item) => secTotal + item.duration, 0),
    0,
  );

  const totalSectionDuration = () => {
    const hours = Math.floor(totalDurationInMinutes / 60);
    const minutes = totalDurationInMinutes % 60;

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
      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
        {t('courseSection.stats', {
          sectionsCount: sections.length,
          lecturesCount: totalNumberOfLectures,
          duration: totalSectionDuration(),
        })}
      </Typography>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {sections.map((section) => (
          <SectionCard key={section.id} section={section} />
        ))}
      </div>
    </>
  );
};

export default CourseSections;
