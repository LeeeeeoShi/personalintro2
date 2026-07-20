'use client';
import { useState, useCallback, useEffect, useRef } from 'react';

export function useLocalStorage<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(fallback);
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;
    fetch(`/api/content?key=${encodeURIComponent(key)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data !== null) setValue(data);
      })
      .catch(() => {});
  }, [key]);

  const set = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved =
          typeof next === 'function'
            ? (next as (prev: T) => T)(prev)
            : next;
        fetch('/api/content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ key, data: resolved }),
        }).catch(() => {});
        return resolved;
      });
    },
    [key],
  );

  return [value, set] as const;
}
