import { useMutation, useQuery } from '@apollo/client/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';

import {
  DeleteNotificationsDocument,
  NotificationCategory,
  NotificationsDocument,
  ReadNotificationsDocument,
} from '@/generated/graphql';
import { ErrorPlaceholder } from '@/ui/compositions';
import { NotificationContext } from '@/ui/context';

import Notifications from './Notifications';
import NotificationsSkeleton from './NotificationsSkeleton';

const PAGE_SIZE = 20;

const NotificationsContainer = () => {
  const navigate = useNavigate();
  const { version, refresh } = useContext(NotificationContext);
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [category, setCategory] = useState<NotificationCategory | null>(null);
  const [limit, setLimit] = useState(PAGE_SIZE);

  const { loading, error, data, refetch } = useQuery(NotificationsDocument, {
    variables: {
      first: limit,
      offset: 0,
      unreadOnly,
      categories: category ? [category] : undefined,
    },
  });

  const [markRead] = useMutation(ReadNotificationsDocument);
  const [remove] = useMutation(DeleteNotificationsDocument);

  const seenVersion = useRef(version);

  useEffect(() => {
    if (seenVersion.current !== version) {
      seenVersion.current = version;
      refetch();
    }
  }, [version, refetch]);

  // The active filter can disappear out from under us (the last row of that
  // category was deleted) — fall back to "all" so no phantom filter sticks.
  useEffect(() => {
    if (category && data && !data.notifications.availableCategories.includes(category)) {
      setCategory(null);
    }
  }, [category, data]);

  if (loading && !data) {
    return <NotificationsSkeleton />;
  }

  if (error || !data) {
    return <ErrorPlaceholder onRetry={() => refetch()} />;
  }

  const run = async (action: Promise<unknown>) => {
    try {
      await action;
      refresh();
      await refetch();
    } catch (_error) {
      // Ignore errors.
    }
  };

  const handleOpen = (link: string | null, id: string, isRead: boolean) => {
    if (link) {
      navigate(link);
    }

    if (!isRead) {
      run(markRead({ variables: { ids: [id] } }));
    }
  };

  const handleCategoryChange = (next: NotificationCategory | null) => {
    setCategory(next);
    setLimit(PAGE_SIZE);
  };

  const { items, totalCount, availableCategories } = data.notifications;

  return (
    <Notifications
      items={items}
      hasMore={items.length < totalCount}
      isFetching={loading}
      unreadOnly={unreadOnly}
      category={category}
      availableCategories={availableCategories}
      onUnreadOnlyChange={setUnreadOnly}
      onCategoryChange={handleCategoryChange}
      onOpen={handleOpen}
      onReadOne={(id) => run(markRead({ variables: { ids: [id] } }))}
      onReadAll={() => run(markRead({ variables: {} }))}
      onDeleteOne={(id) => run(remove({ variables: { ids: [id] } }))}
      onLoadMore={() => setLimit((current) => current + PAGE_SIZE)}
    />
  );
};

export default NotificationsContainer;
