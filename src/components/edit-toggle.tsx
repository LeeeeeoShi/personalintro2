'use client';
import { useState, useRef, useEffect } from 'react';
import { useEditMode } from '@/hooks/useEditMode';
import { Pencil, Lock, Unlock } from 'lucide-react';

export default function EditToggle() {
  const { editing, locked, toggle, unlock } = useEditMode();
  const [showPrompt, setShowPrompt] = useState(false);
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showPrompt) setTimeout(() => inputRef.current?.focus(), 100);
  }, [showPrompt]);

  const handleClick = () => {
    if (editing) {
      toggle();
      return;
    }
    if (locked) {
      setShowPrompt(true);
    } else {
      toggle();
    }
  };

  const handleSubmit = (pw: string) => {
    if (unlock(pw)) {
      setShowPrompt(false);
      setError(false);
      toggle();
    } else {
      setError(true);
    }
  };

  if (showPrompt) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
        <div className="bg-card-bg rounded-2xl p-6 shadow-xl max-w-xs w-full mx-4 border border-border">
          <h3 className="text-sm font-medium text-foreground mb-1">编辑页面</h3>
          <p className="text-xs text-gray-soft font-light mb-4">请输入密码</p>
          <input
            ref={inputRef}
            type="password"
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground outline-none focus:border-terracotta transition-colors"
            placeholder="密码"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSubmit((e.target as HTMLInputElement).value);
              if (e.key === 'Escape') setShowPrompt(false);
            }}
          />
          {error && <p className="text-xs text-terracotta mt-2">密码错误</p>}
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => setShowPrompt(false)}
              className="px-4 py-1.5 text-xs text-gray-soft hover:text-foreground transition-colors"
            >
              取消
            </button>
            <button
              onClick={() => handleSubmit(inputRef.current?.value || '')}
              className="px-4 py-1.5 text-xs bg-terracotta text-white rounded-full"
            >
              确认
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`fixed bottom-6 left-6 z-50 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm shadow-lg ${
        editing
          ? 'bg-terracotta text-white shadow-terracotta/30'
          : 'bg-foreground/10 text-foreground hover:bg-foreground/20'
      }`}
      aria-label={editing ? '退出编辑' : '编辑页面'}
    >
      {editing ? <Unlock size={15} /> : locked ? <Lock size={15} /> : <Pencil size={15} />}
    </button>
  );
}
