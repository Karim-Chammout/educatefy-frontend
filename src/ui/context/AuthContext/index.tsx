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

type AuthContextType = {
  authModal: {
    isAuthModalVisible: boolean;
    setModalVisibility: Dispatch<SetStateAction<boolean>>;
    setAuthModalVisibility: (kind: 'login' | 'register') => void;
    authModalType: 'login' | 'register' | undefined;
  };
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authModalType, setAuthModalType] = useState<'login' | 'register' | undefined>(undefined);
  const [isAuthModalVisible, setModalVisibility] = useState(false);

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

  const value = useMemo(
    () => ({
      authModal: {
        isAuthModalVisible,
        setModalVisibility,
        setAuthModalVisibility,
        authModalType,
      },
    }),
    [isAuthModalVisible, setAuthModalVisibility, authModalType],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
