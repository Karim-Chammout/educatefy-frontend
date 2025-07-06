import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { CourseSectionFragment } from '@/generated/graphql';
import { AuthContext } from '@/ui/context';
import { isLoggedIn } from '@/ui/layout/apolloClient';
import { savePostLoginRedirectPath } from '@/utils/savePostLoginRedirectPath';
import { SectionTitle } from '../Course.style';
import { SectionCard } from './SectionCard';

const CourseSections = ({
  slug,
  sections,
}: {
  slug: string;
  sections: CourseSectionFragment[];
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    authModal: { setAuthModalVisibility },
  } = useContext(AuthContext);

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

  const handleSectionClick = (sectionId: string) => {
    if (!isLoggedIn()) {
      savePostLoginRedirectPath(`/course/${slug}/section/${sectionId}`);
      setAuthModalVisibility('login');

      return;
    }

    navigate(`/course/${slug}/section/${sectionId}`);
  };

  return (
    <>
      <SectionTitle component="h3" variant="h6" gutterBottom>
        {t('course.sections')}
      </SectionTitle>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {sections.map((section) => (
          <SectionCard
            key={section.id}
            section={section}
            onSectionClick={handleSectionClick}
            calculateSectionDuration={calculateSectionDuration}
          />
        ))}
      </div>
    </>
  );
};

export default CourseSections;
