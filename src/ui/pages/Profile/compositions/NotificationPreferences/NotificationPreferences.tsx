import { useMutation, useQuery } from '@apollo/client/react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Switch from '@mui/material/Switch';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import {
  NotificationPreferenceDocument,
  NotificationType,
  NotificationTypesDocument,
  UpdateNotificationPreferenceDocument,
} from '@/generated/graphql';
import { Typography } from '@/ui/components';
import { ToasterContext } from '@/ui/context';

const CHANNEL_COLUMN_WIDTH = 72;

/**
 * A missing preference row means both channels are on.
 */
const NotificationPreferences = () => {
  const { t } = useTranslation();
  const { setToasterVisibility } = useContext(ToasterContext);

  const {
    data: preferenceData,
    loading,
    error,
    refetch,
  } = useQuery(NotificationPreferenceDocument);
  const { data: typesData } = useQuery(NotificationTypesDocument);

  const [save] = useMutation(UpdateNotificationPreferenceDocument);

  const items = preferenceData?.notificationPreference.items ?? [];
  const types = typesData?.notificationTypes ?? [];
  const stateByType = new Map<string, (typeof items)[number]>(
    items.map((item) => [item.type as string, item]),
  );

  const run = async (type: NotificationType, variables: Record<string, unknown>) => {
    try {
      await save({ variables: { type, ...variables } });
      await refetch();
    } catch (_error) {
      setToasterVisibility({
        newDuration: 5000,
        newText: t('notificationPreferences.saveFailed'),
        newType: 'error',
      });

      await refetch();
    }
  };

  if (error && !preferenceData) {
    return (
      <Typography variant="body2" color="error">
        {t('notificationPreferences.loadFailed')}
      </Typography>
    );
  }

  if (loading || !preferenceData) {
    return (
      <Box>
        <Skeleton variant="text" width="60%" height={30} />
        <Skeleton variant="text" width="45%" height={30} />
        <Skeleton variant="text" width="50%" height={30} />
      </Box>
    );
  }

  const channelHeader = {
    display: 'grid',
    gridTemplateColumns: `minmax(0, 1fr) ${CHANNEL_COLUMN_WIDTH}px ${CHANNEL_COLUMN_WIDTH}px`,
    columnGap: 1,
    alignItems: 'center',
  } as const;

  return (
    <Box>
      <Box sx={{ ...channelHeader, pb: 1 }}>
        <Box />
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ textAlign: 'center', fontWeight: 600 }}
        >
          {t('notificationPreferences.channels.inApp')}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ textAlign: 'center', fontWeight: 600 }}
        >
          {t('notificationPreferences.channels.email')}
        </Typography>
      </Box>

      {types.map((type) => {
        const state = stateByType.get(type.code);
        const label = t(`notification.label.${type.code}`);

        return (
          <Box
            key={type.code}
            sx={{
              ...channelHeader,
              py: 0.5,
              borderTop: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="body2">{label}</Typography>
            <Switch
              size="small"
              checked={state?.inAppEnabled ?? true}
              onChange={(event) =>
                run(type.code as NotificationType, { inAppEnabled: event.target.checked })
              }
              slotProps={{
                input: {
                  'aria-label': `${label} — ${t('notificationPreferences.channels.inApp')}`,
                },
              }}
            />
            <Switch
              size="small"
              checked={state?.emailEnabled ?? true}
              onChange={(event) =>
                run(type.code as NotificationType, { emailEnabled: event.target.checked })
              }
              slotProps={{
                input: {
                  'aria-label': `${label} — ${t('notificationPreferences.channels.email')}`,
                },
              }}
            />
          </Box>
        );
      })}
    </Box>
  );
};

export default NotificationPreferences;
