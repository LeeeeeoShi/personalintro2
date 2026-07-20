'use client';
import { useState, useCallback } from 'react';

export function useLocalStorage<T>(key: string, fallback: T) {
  const localKey = `local:${key}`;

  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return fallback;
    try {
      const raw = localStorage.getItem(localKey);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  });

  const set = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved =
          typeof next === 'function'
            ? (next as (prev: T) => T)(prev)
            : next;
        try {
          localStorage.setItem(localKey, JSON.stringify(resolved));
        } catch {}
        return resolved;
      });
    },
    [localKey],
  );

  return [value, set] as const;
}
