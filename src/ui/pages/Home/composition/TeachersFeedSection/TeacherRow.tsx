import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import person from '@/assets/person.png';
import { HomeTeacherFragment } from '@/generated/graphql';
import { Typography } from '@/ui/components';
import { TopContentCard, TopContentCardItem } from '@/ui/compositions';
import { getTeacherPath } from '@/utils/getTeacherPath';

type TeacherRowProps = {
  teacher: HomeTeacherFragment;
  items: TopContentCardItem[];
};

const TeacherRow = ({ teacher, items }: TeacherRowProps) => {
  const { t } = useTranslation();

  const name = `${teacher.first_name ?? ''} ${teacher.last_name ?? ''}`.trim();

  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
        <Avatar src={teacher.avatar_url || person} alt={name} sx={{ width: 40, height: 40 }} />

        <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
          {name}
        </Typography>

        <Button
          component={Link}
          to={getTeacherPath(teacher.id)}
          variant="outlined"
          size="small"
          aria-label={t('home.viewAllContentFromTeacher', { name })}
        >
          {t('home.viewAllContent')}
        </Button>
      </Box>

      <Grid container spacing={3}>
        {items.map((item) => (
          <Grid
            key={`${item.__typename}-${item.id}`}
            size={{ xxs: 12, sm: 6, md: 4 }}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <TopContentCard item={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TeacherRow;
