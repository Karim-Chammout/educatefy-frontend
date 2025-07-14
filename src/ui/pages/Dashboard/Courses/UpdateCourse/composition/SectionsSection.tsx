import EditIcon from '@mui/icons-material/Edit';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { Button, Typography } from '@/ui/components';

const SectionsSection = ({ courseId }: { courseId: string }) => {
  const { t } = useTranslation();

  return (
    <Paper elevation={0} variant="outlined" sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {t('course.sections')}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {t('course.sectionsSubtitle')}
      </Typography>

      <Button
        startIcon={<EditIcon />}
        variant="outlined"
        color="info"
        LinkComponent={Link}
        to={`/dashboard/courses/update/${courseId}/sections`}
      >
        {t('course.manageSectionsBtn')}
      </Button>
    </Paper>
  );
};

export default SectionsSection;
