'use client';
import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';

const PASSWORD_KEY = 'edit-auth';

interface EditCtx {
  editing: boolean;
  locked: boolean;
  toggle: () => void;
  unlock: (pw: string) => boolean;
  lock: () => void;
}

const EditContext = createContext<EditCtx>({
  editing: false,
  locked: true,
  toggle: () => {},
  unlock: () => false,
  lock: () => {},
});

export function EditProvider({ children }: { children: ReactNode }) {
  const [editing, setEditing] = useState(false);
  const [locked, setLocked] = useState(true);

  useEffect(() => {
    setLocked(!localStorage.getItem(PASSWORD_KEY));
  }, []);

  const unlock = useCallback((pw: string) => {
    if (pw === '123456') {
      localStorage.setItem(PASSWORD_KEY, '1');
      setLocked(false);
      return true;
    }
    return false;
  }, []);

  const lock = useCallback(() => {
    localStorage.removeItem(PASSWORD_KEY);
    setLocked(true);
    setEditing(false);
  }, []);

  const toggle = useCallback(() => {
    setEditing((v) => !v);
  }, []);

  return (
    <EditContext.Provider value={{ editing, locked, toggle, unlock, lock }}>
      {children}
    </EditContext.Provider>
  );
}

export function useEditMode() {
  return useContext(EditContext);
}
