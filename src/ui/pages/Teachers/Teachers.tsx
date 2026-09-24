import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useTranslation } from 'react-i18next';

import { TeachersQuery } from '@/generated/graphql';
import { PageHeader } from '@/ui/compositions';

import { TeacherListItem } from './composition';

type TeachersProps = {
  teachers: TeachersQuery['teachers']['items'];
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
};

const Teachers = ({ teachers, currentPage, pageCount, onPageChange }: TeachersProps) => {
  const { t } = useTranslation();

  return (
    <div style={{ marginTop: '16px' }}>
      <PageHeader title={t('teachers.heading')} subtitle={t('teachers.subheading')} />

      <Stack spacing={3}>
        {teachers.map((teacher) => (
          <TeacherListItem
            key={teacher.id}
            id={teacher.id}
            firstName={teacher.first_name}
            lastName={teacher.last_name}
            avatarUrl={teacher.avatar_url}
            bio={teacher.bio}
            isFollowed={teacher.isFollowed}
            isAllowedToFollow={teacher.isAllowedToFollow}
            followersCount={teacher.followersCount}
            subjects={teacher.subjects}
          />
        ))}
      </Stack>

      {pageCount > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
          <Pagination
            color="primary"
            page={currentPage}
            count={pageCount}
            onChange={(_, value) => onPageChange(value)}
          />
        </div>
      )}
    </div>
  );
};

export default Teachers;
