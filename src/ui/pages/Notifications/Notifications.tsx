import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import InboxRoundedIcon from '@mui/icons-material/InboxRounded';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { formatDistanceToNow } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { NotificationCategory, NotificationsQuery } from '@/generated/graphql';
import { Typography } from '@/ui/components';
import { InfoState, NotificationCategoryChips, PageHeader } from '@/ui/compositions';
import { notificationIcon, notificationMessage } from '@/utils/notifications';

type NotificationItem = NotificationsQuery['notifications']['items'][number];

type NotificationsProps = {
  items: NotificationItem[];
  hasMore: boolean;
  isFetching: boolean;
  unreadOnly: boolean;
  category: NotificationCategory | null;
  availableCategories: NotificationCategory[];
  onUnreadOnlyChange: (value: boolean) => void;
  onCategoryChange: (value: NotificationCategory | null) => void;
  onOpen: (link: string | null, id: string, isRead: boolean) => void;
  onReadOne: (id: string) => void;
  onReadAll: () => void;
  onDeleteOne: (id: string) => void;
  onLoadMore: () => void;
};

type Section = { key: string; label: string; items: NotificationItem[] };

const SECTION_KEYS = ['today', 'yesterday', 'earlier'];

const sectionIndexFor = (date: Date, today: Date, yesterday: Date): number => {
  if (date >= today) {
    return 0;
  }

  if (date >= yesterday) {
    return 1;
  }

  return 2;
};

const groupByDay = (items: NotificationItem[], labels: string[]): Section[] => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const sections: Section[] = labels.map((label, index) => ({
    key: SECTION_KEYS[index],
    label,
    items: [],
  }));

  items.forEach((item) => {
    sections[sectionIndexFor(new Date(item.created_at), today, yesterday)].items.push(item);
  });

  return sections.filter((section) => section.items.length > 0);
};

const Notifications = ({
  items,
  hasMore,
  isFetching,
  unreadOnly,
  category,
  availableCategories,
  onUnreadOnlyChange,
  onCategoryChange,
  onOpen,
  onReadOne,
  onReadAll,
  onDeleteOne,
  onLoadMore,
}: NotificationsProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const sections = groupByDay(items, [
    t('notifications.today'),
    t('notifications.yesterday'),
    t('notifications.earlier'),
  ]);

  const handleOpen = (item: NotificationItem) => {
    onOpen(item.link ?? null, item.id, item.is_read);
  };

  return (
    <div style={{ marginTop: '16px' }}>
      <PageHeader title={t('notifications.title')} subtitle={t('notifications.subtitle')} />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Tabs
          value={unreadOnly ? 1 : 0}
          onChange={(_, value: number) => onUnreadOnlyChange(value === 1)}
        >
          <Tab label={t('notifications.tabAll')} sx={{ minHeight: 44 }} />
          <Tab label={t('notifications.tabUnread')} sx={{ minHeight: 44 }} />
        </Tabs>
        <Button startIcon={<DoneAllIcon />} onClick={onReadAll} disabled={items.length === 0}>
          {t('notifications.markAllRead')}
        </Button>
      </Box>

      <Box sx={{ mt: 1.5 }}>
        <NotificationCategoryChips
          value={category}
          available={availableCategories}
          onChange={onCategoryChange}
        />
      </Box>

      {items.length === 0 ? (
        <InfoState
          icon={<InboxRoundedIcon />}
          title={unreadOnly ? t('notifications.emptyUnreadTitle') : t('notifications.emptyTitle')}
          subtitle={t('notifications.emptySubtitle')}
          btnLabel={unreadOnly ? t('notifications.showAll') : t('common.catalogBtnLabel')}
          btnOnClick={() => (unreadOnly ? onUnreadOnlyChange(false) : navigate('/catalog'))}
        />
      ) : (
        sections.map((section) => (
          <Box key={section.key}>
            <Typography
              variant="overline"
              color="text.secondary"
              sx={{ display: 'block', mt: 2, mb: 0.5 }}
            >
              {section.label}
            </Typography>
            <List disablePadding>
              {section.items.map((item) => {
                const Icon = notificationIcon(item.type);

                return (
                  <ListItem
                    key={item.id}
                    divider
                    disableGutters
                    sx={{
                      gap: 1.5,
                      px: 1,
                      py: 1.5,
                      '&:hover .notification-actions, &:focus-within .notification-actions': {
                        opacity: 1,
                      },
                    }}
                  >
                    <ListItemButton
                      onClick={() => handleOpen(item)}
                      sx={{
                        flex: 1,
                        minWidth: 0,
                        alignItems: 'flex-start',
                        gap: 1.5,
                        px: 1,
                        py: 0.75,
                        borderInlineStart: '3px solid',
                        borderColor: item.is_read ? 'transparent' : 'primary.main',
                        bgcolor: item.is_read ? 'transparent' : 'action.hover',
                        borderRadius: 1,
                      }}
                    >
                      <ListItemAvatar sx={{ minWidth: 44 }}>
                        <Avatar
                          sx={{
                            width: 36,
                            height: 36,
                            bgcolor: 'transparent',
                            color: item.is_read ? 'text.secondary' : 'primary.main',
                            border: '1px solid',
                            borderColor: 'divider',
                          }}
                        >
                          <Icon fontSize="small" />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={notificationMessage(t, item.type, item.payload)}
                        secondary={formatDistanceToNow(new Date(item.created_at), {
                          addSuffix: true,
                        })}
                        slotProps={{
                          primary: {
                            variant: 'body2',
                            sx: { fontWeight: item.is_read ? 400 : 600 },
                          },
                          secondary: { variant: 'caption' },
                        }}
                      />
                    </ListItemButton>

                    {item.link && (
                      <Button
                        size="small"
                        variant="outlined"
                        sx={{ flexShrink: 0 }}
                        onClick={() => handleOpen(item)}
                      >
                        {t(`notification.cta.${item.type}`, {
                          defaultValue: t('notification.cta.default'),
                        })}
                      </Button>
                    )}

                    <Box
                      className="notification-actions"
                      sx={{
                        display: 'flex',
                        gap: 0.5,
                        flexShrink: 0,
                        opacity: { xs: 1, sm: 0 },
                        transition: 'opacity 120ms',
                      }}
                    >
                      {!item.is_read && (
                        <IconButton
                          size="small"
                          aria-label={t('notifications.markRead')}
                          onClick={() => onReadOne(item.id)}
                        >
                          <CheckIcon fontSize="small" />
                        </IconButton>
                      )}
                      <IconButton
                        size="small"
                        aria-label={t('notifications.delete')}
                        onClick={() => onDeleteOne(item.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        ))
      )}

      {hasMore && (
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Button onClick={onLoadMore} disabled={isFetching}>
            {t('notifications.loadMore')}
          </Button>
        </Box>
      )}
    </div>
  );
};

export default Notifications;
