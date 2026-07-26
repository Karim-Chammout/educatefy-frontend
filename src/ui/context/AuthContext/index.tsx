import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useLocation } from 'react-router';

import { BASE_URL } from '@/ui/layout/apolloClient';

type AuthUser = {
  userId: number;
  role: string;
};

type AuthContextType = {
  authModal: {
    isAuthModalVisible: boolean;
    setModalVisibility: Dispatch<SetStateAction<boolean>>;
    setAuthModalVisibility: (kind: 'login' | 'register') => void;
    authModalType: 'login' | 'register' | undefined;
  };
  user: AuthUser | null;
  loading: boolean;
  refresh: () => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

// Module-level ref so non-component code (terminatSession, etc.) can trigger an auth
// state refresh.
let refreshAuthFn: (() => Promise<void>) | null = null;

// Module-level promise guard to prevent multiple concurrent refreshes from being sent to the backend.
let refreshPromise: Promise<void> | null = null;

export function getAuthRefresh(): (() => Promise<void>) | null {
  return refreshAuthFn;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authModalType, setAuthModalType] = useState<'login' | 'register' | undefined>(undefined);
  const [isAuthModalVisible, setModalVisibility] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
    setModalVisibility(false);
  }, [location.pathname]);

  const setAuthModalVisibility = useCallback(
    (kind: 'login' | 'register') => {
      if (!isAuthModalVisible || kind === undefined) {
        setModalVisibility((prev) => !prev);
      }

      setAuthModalType(kind);
    },
    [isAuthModalVisible],
  );

  const refresh = useCallback(async () => {
    // If a refresh is already in flight, return the existing promise.
    if (refreshPromise) {
      return refreshPromise;
    }

    refreshPromise = (async () => {
      try {
        setLoading(true);

        const headers: Record<string, string> = {};
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          headers.refreshtoken = refreshToken;
        }

        const response = await fetch(`${BASE_URL}/api/openid/status`, {
          credentials: 'include',
          headers,
        });

        // Store the rotated refresh token if the backend issued one
        const newRefreshToken = response.headers.get('X-Renew-Refresh-Token');
        if (newRefreshToken) {
          localStorage.setItem('refreshToken', newRefreshToken);
        }

        if (response.ok) {
          const data = await response.json();
          setUser({ userId: data.userId, role: data.role });
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
        refreshPromise = null;
      }
    })();

    return refreshPromise;
  }, []);

  // Keep the module-level ref in sync with the React refresh function so that
  // non-component code (terminatSession in logout.ts, ErrorLink in apolloClient.ts)
  // can trigger an auth-status re-fetch via getAuthRefresh().
  useEffect(() => {
    refreshAuthFn = refresh;

    return () => {
      refreshAuthFn = null;
    };
  }, [refresh]);

  // Check auth status on mount
  useEffect(() => {
    refresh();
  }, [refresh]);

  const value = useMemo(
    () => ({
      authModal: {
        isAuthModalVisible,
        setModalVisibility,
        setAuthModalVisibility,
        authModalType,
      },
      user,
      loading,
      refresh,
    }),
    [isAuthModalVisible, setAuthModalVisibility, authModalType, user, loading, refresh],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
