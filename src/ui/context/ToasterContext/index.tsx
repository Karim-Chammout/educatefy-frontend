import { createContext, ReactNode, useCallback, useMemo, useState } from 'react';

type ToasterLevelType = 'success' | 'info' | 'warning' | 'error';

type ToasterContextType = {
  text: string;
  type: ToasterLevelType;
  isVisible: boolean;
  handleCloseNotification: () => void;
  setToasterVisibility: ({
    newText,
    newType,
    newDuration,
  }: {
    newText: string;
    newType: ToasterLevelType;
    newDuration: number | null;
  }) => void;
  duration: number | null;
};

export const ToasterContext = createContext({} as ToasterContextType);

export function ToasterProvider({ children }: { children: ReactNode }) {
  const [isVisible, setVisible] = useState(false);
  const [text, setText] = useState('');
  const [type, setType] = useState<ToasterLevelType>('success');
  const [duration, setDuration] = useState<number | null>(null);
  const handleCloseNotification = () => setVisible(false);

  const setToasterVisibility = useCallback(
    ({
      newText,
      newType,
      newDuration,
    }: {
      newText: string;
      newType: ToasterLevelType;
      newDuration: number | null;
    }) => {
      setType(newType);
      setText(newText);
      setDuration(newDuration);
      setVisible(true);
    },
    [setType, setText, setVisible],
  );

  const value = useMemo(
    () => ({
      text,
      type,
      duration,
      isVisible,
      setToasterVisibility,
      handleCloseNotification,
    }),
    [duration, isVisible, setToasterVisibility, text, type],
  );

  return <ToasterContext.Provider value={value}>{children}</ToasterContext.Provider>;
}
