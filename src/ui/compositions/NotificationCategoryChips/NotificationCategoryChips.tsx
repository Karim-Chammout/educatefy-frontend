import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { useTranslation } from 'react-i18next';

import { NotificationCategory } from '@/generated/graphql';
import { notificationCategoryIcon } from '@/utils/notifications';

type NotificationCategoryChipsProps = {
  value: NotificationCategory | null;
  available: NotificationCategory[];
  onChange: (value: NotificationCategory | null) => void;
};

const NotificationCategoryChips = ({
  value,
  available,
  onChange,
}: NotificationCategoryChipsProps) => {
  const { t } = useTranslation();

  if (available.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        flexWrap: 'nowrap',
        overflowX: 'auto',
        pb: 0.5,
        scrollbarWidth: 'thin',
      }}
    >
      <Chip
        size="small"
        label={t('notifications.tabAll')}
        onClick={() => onChange(null)}
        color={value === null ? 'primary' : 'default'}
        variant={value === null ? 'filled' : 'outlined'}
        sx={{ p: 1 }}
      />
      {available.map((category) => {
        const Icon = notificationCategoryIcon(category);

        return (
          <Chip
            key={category}
            size="small"
            icon={<Icon />}
            label={t(`notification.category.${category}`)}
            onClick={() => onChange(category)}
            color={value === category ? 'primary' : 'default'}
            variant={value === category ? 'filled' : 'outlined'}
            sx={{ flexShrink: 0, p: 1 }}
          />
        );
      })}
    </Box>
  );
};

export default NotificationCategoryChips;
