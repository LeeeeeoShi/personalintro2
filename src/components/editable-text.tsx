'use client';
import { useEffect, useRef, createElement, type ElementType } from 'react';
import { useEditMode } from '@/hooks/useEditMode';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export default function EditableText({
  storageKey,
  fallback,
  className = '',
  tag: Tag = 'p',
}: {
  storageKey: string;
  fallback: string;
  className?: string;
  tag?: ElementType;
}) {
  const { editing } = useEditMode();
  const [text, setText] = useLocalStorage(storageKey, fallback);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!editing && ref.current) ref.current.blur();
  }, [editing]);

  return createElement(
    Tag,
    {
      ref,
      contentEditable: editing,
      suppressContentEditableWarning: true,
      className: `${className} ${editing ? 'editable-ring' : ''}`,
      onBlur: (e: React.FocusEvent<HTMLElement>) => {
        const next = (e.target as HTMLElement).textContent?.trim() || fallback;
        if (next !== text) setText(next);
      },
      onKeyDown: (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') (e.target as HTMLElement).blur();
      },
    },
    text,
  );
}
