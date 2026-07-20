'use client';
import { useCallback } from 'react';
import { useEditMode } from '@/hooks/useEditMode';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Upload } from 'lucide-react';

export default function DroppableImage({
  storageKey,
  defaultSrc = '',
  alt = '',
  className = '',
  style,
  aspectRatio = 'aspect-square',
}: {
  storageKey: string;
  defaultSrc?: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  aspectRatio?: string;
}) {
  const { editing } = useEditMode();
  const [dataUrl, setDataUrl] = useLocalStorage(storageKey, '');

  const src = dataUrl || defaultSrc;

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => setDataUrl(reader.result as string);
    reader.readAsDataURL(file);
  }, [setDataUrl]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    if (editing) e.preventDefault();
  }, [editing]);

  return (
    <div
      onDrop={editing ? handleDrop : undefined}
      onDragOver={handleDragOver}
      className={`relative overflow-hidden ${aspectRatio} ${className} ${editing ? 'ring-2 ring-dashed ring-terracotta/40 cursor-copy' : ''}`}
      style={style}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#e8e4dc] to-[#ddd9d0] dark:from-[#222] dark:to-[#1a1a1c]">
          <span className="text-sm text-gray-soft font-light">{alt || '拖入图片'}</span>
        </div>
      )}
      {editing && !src && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 dark:bg-black/30">
          <Upload size={20} className="text-terracotta" />
        </div>
      )}
    </div>
  );
}
