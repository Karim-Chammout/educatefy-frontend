import { useQuery, useSubscription } from '@apollo/client/react';
import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

import { NotificationActivityDocument, UnreadNotificationCountDocument } from '@/generated/graphql';

type NotificationContextType = {
  unreadCount: number;
  /** Increments on every live notification, so lists know to refetch. */
  version: number;
  refresh: () => void;
};

export const NotificationContext = createContext<NotificationContextType>({
  unreadCount: 0,
  version: 0,
  refresh: () => undefined,
});

export function NotificationProvider({ children }: { children: ReactNode }) {
  const { data, refetch } = useQuery(UnreadNotificationCountDocument);
  // `ignore`: an expired cookie must not crash the page, the badge just stays.
  const { data: activity } = useSubscription(NotificationActivityDocument, {
    errorPolicy: 'ignore',
  });
  const [liveCount, setLiveCount] = useState<number | null>(null);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    if (!activity) {
      return;
    }

    setLiveCount(activity.notificationActivity?.unreadCount ?? null);
    setVersion((current) => current + 1);
  }, [activity]);

  const refresh = useCallback(() => {
    // Drop the pushed value so the refetch is what the badge shows.
    setLiveCount(null);
    refetch();
  }, [refetch]);

  const value = useMemo(
    () => ({
      unreadCount: liveCount ?? data?.unreadNotificationCount ?? 0,
      version,
      refresh,
    }),
    [liveCount, data, version, refresh],
  );

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}
