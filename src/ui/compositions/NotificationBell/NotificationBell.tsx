import { useMutation, useQuery } from '@apollo/client/react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Popover from '@mui/material/Popover';
import Skeleton from '@mui/material/Skeleton';
import { formatDistanceToNow } from 'date-fns';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import {
  NotificationCategory,
  NotificationsDocument,
  ReadNotificationsDocument,
} from '@/generated/graphql';
import { Typography } from '@/ui/components';
import { NotificationContext } from '@/ui/context';
import { notificationIcon, notificationMessage } from '@/utils/notifications';

import NotificationCategoryChips from '../NotificationCategoryChips';

const PREVIEW_COUNT = 8;

const NotificationBell = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { unreadCount, refresh } = useContext(NotificationContext);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [category, setCategory] = useState<NotificationCategory | null>(null);
  const [markRead] = useMutation(ReadNotificationsDocument);

  // `network-only`: the preview is never a stale cache read.
  const { data, loading } = useQuery(NotificationsDocument, {
    variables: {
      first: PREVIEW_COUNT,
      offset: 0,
      unreadOnly: false,
      categories: category ? [category] : undefined,
    },
    skip: !anchorEl,
    fetchPolicy: 'network-only',
  });

  const items = data?.notifications.items ?? [];
  const availableCategories = data?.notifications.availableCategories ?? [];

  const handleOpenRow = (item: (typeof items)[number]) => {
    if (item.link) {
      navigate(item.link);
    }

    if (!item.is_read) {
      markRead({ variables: { ids: [item.id] } })
        .then(() => refresh())
        .catch(() => {});
    }

    setAnchorEl(null);
  };

  const handleMarkAll = () => {
    markRead({ variables: {} })
      .then(() => refresh())
      .catch(() => {});
  };

  return (
    <>
      <IconButton
        color="inherit"
        aria-label={t('notifications.badgeLabel')}
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        <Badge badgeContent={unreadCount} color="error" max={99}>
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              width: { xs: 'calc(100vw - 16px)', sm: 360 },
              maxHeight: 460,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            },
          },
        }}
        disableScrollLock
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2,
            py: 1.5,
            borderBottom: '1px solid',
            borderColor: 'divider',
            flexShrink: 0,
          }}
        >
          <Typography variant="h6" component="span">
            {t('notifications.title')}
          </Typography>
          <Button
            size="small"
            startIcon={<DoneAllIcon />}
            onClick={handleMarkAll}
            disabled={unreadCount === 0}
          >
            {t('notifications.markAllRead')}
          </Button>
        </Box>

        <Box
          sx={{
            px: 2,
            pt: availableCategories.length > 0 ? 1.5 : 0,
            pb: availableCategories.length > 0 ? 1.5 : 0,
            borderBottom: availableCategories.length > 0 ? '1px solid' : 'none',
            borderColor: 'divider',
            flexShrink: 0,
          }}
        >
          <NotificationCategoryChips
            value={category}
            available={availableCategories}
            onChange={setCategory}
          />
        </Box>

        {loading && (
          <List disablePadding sx={{ flex: 1, overflowY: 'auto' }}>
            {Array.from({ length: 3 }, (_, index) => (
              <Box
                key={`bell-skeleton-${index}`}
                sx={{ display: 'flex', gap: 1.5, px: 2, py: 1.5 }}
              >
                <Skeleton variant="circular" width={32} height={32} />
                <Box sx={{ flex: 1 }}>
                  <Skeleton variant="text" width="80%" height={20} />
                  <Skeleton variant="text" width="40%" height={16} />
                </Box>
              </Box>
            ))}
          </List>
        )}

        {!loading && items.length === 0 && (
          <Box sx={{ px: 2, py: 3 }}>
            <Typography color="text.secondary">{t('notifications.emptySubtitle')}</Typography>
          </Box>
        )}

        {!loading && items.length > 0 && (
          <List disablePadding sx={{ flex: 1, overflowY: 'auto' }}>
            {items.map((item) => {
              const Icon = notificationIcon(item.type);

              return (
                <ListItemButton
                  key={item.id}
                  divider
                  onClick={() => handleOpenRow(item)}
                  sx={{
                    alignItems: 'flex-start',
                    gap: 1.5,
                    px: 2,
                    py: 1.5,
                    bgcolor: item.is_read ? 'transparent' : 'action.hover',
                    // The footer already draws a top border — don't double it.
                    '&:last-of-type': { borderBottom: 'none' },
                  }}
                >
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: 'transparent',
                      color: item.is_read ? 'text.secondary' : 'primary.main',
                      border: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    <Icon fontSize="small" />
                  </Avatar>
                  <ListItemText
                    primary={notificationMessage(t, item.type, item.payload)}
                    secondary={formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
                    slotProps={{
                      primary: {
                        variant: 'body2',
                        sx: { fontWeight: item.is_read ? 400 : 600 },
                      },
                      secondary: { variant: 'caption' },
                    }}
                  />
                  {item.link && <ChevronRightIcon color="action" fontSize="small" />}
                </ListItemButton>
              );
            })}
          </List>
        )}

        <Box sx={{ borderTop: '1px solid', borderColor: 'divider', p: 1, flexShrink: 0 }}>
          <Button
            fullWidth
            onClick={() => {
              navigate('/notifications');
              setAnchorEl(null);
            }}
          >
            {t('notifications.viewAll')}
          </Button>
        </Box>
      </Popover>
    </>
  );
};

export default NotificationBell;
