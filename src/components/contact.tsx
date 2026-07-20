'use client';

import { useState } from 'react';
import { Mail, MessageCircle, X } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useEditMode } from '@/hooks/useEditMode';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import SectionHeading from '@/components/section-heading';
import EditableText from '@/components/editable-text';

const socials = [
  { name: '邮箱', icon: Mail, type: 'email' as const },
  { name: '微信', icon: MessageCircle, type: 'wechat' as const },
];

export default function Contact() {
  const { editing } = useEditMode();
  const { ref } = useScrollReveal(0.2);
  const [emailInput, setEmailInput] = useState('');
  const [sent, setSent] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [storedEmail] = useLocalStorage('contact-email', 'leeeeeoshi@foxmail.com');
  const [storedWechat] = useLocalStorage('contact-wechat', 'Zhongxun_Shi');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" ref={ref} className="py-28 md:py-36 px-6 story-bg border-y border-border">
      <div className="max-w-3xl mx-auto text-center space-y-10">
        <div className="reveal space-y-4">
          <SectionHeading title="联系" center />
          <EditableText
            storageKey="contact-desc"
            fallback="我始终对新的合作机会与创作对话保持开放。如果你有项目想法、展览提案，或是单纯想聊聊天，欢迎来信。"
            className="text-sm text-gray-soft font-light max-w-lg mx-auto leading-relaxed"
          />
        </div>

        <form onSubmit={handleSubmit} className="reveal flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto w-full" style={{ transitionDelay: '0.15s' }}>
          <div className="flex-1 w-full">
            <input
              type="email"
              placeholder="你的邮箱"
              className="cta-input"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center h-11 rounded-full px-8 text-sm tracking-wide text-white transition-all duration-300 flex-shrink-0"
            style={{ background: 'var(--terracotta)' }}
          >
            {sent ? '已发送' : '发送消息'}
          </button>
        </form>

        <div className="reveal pt-4" style={{ transitionDelay: '0.25s' }}>
          <p className="text-xs text-gray-soft/60 font-light mb-4">或直接联系我</p>
          <div className="flex justify-center gap-6">
            {socials.map((s) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.name}
                  onClick={() => setShowPopup(true)}
                  className="footer-link flex items-center gap-1.5 text-xs tracking-wider uppercase"
                >
                  <Icon size={14} />
                  {s.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm" onClick={() => setShowPopup(false)}>
          <div className="bg-card-bg rounded-2xl p-6 shadow-xl max-w-xs w-full mx-4 border border-border space-y-5" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-foreground">联系方式</h3>
              <button onClick={() => setShowPopup(false)} className="text-gray-soft/50 hover:text-foreground transition-colors">
                <X size={16} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-xs text-gray-soft/60 flex items-center gap-1.5">
                  <Mail size={12} />
                  邮箱
                </p>
                {editing ? (
                  <EditableText storageKey="contact-email" fallback={storedEmail} tag="p" className="text-sm text-foreground font-light" />
                ) : (
                  <a href={`mailto:${storedEmail}`} className="text-sm text-foreground font-light hover:text-terracotta transition-colors">
                    {storedEmail}
                  </a>
                )}
              </div>

              <div className="space-y-1">
                <p className="text-xs text-gray-soft/60 flex items-center gap-1.5">
                  <MessageCircle size={12} />
                  微信
                </p>
                {editing ? (
                  <EditableText storageKey="contact-wechat" fallback={storedWechat} tag="p" className="text-sm text-foreground font-light" />
                ) : (
                  <p className="text-sm text-foreground font-light">{storedWechat}</p>
                )}
              </div>
            </div>

            <button
              onClick={() => setShowPopup(false)}
              className="w-full py-2 rounded-full text-xs bg-foreground/10 text-foreground hover:bg-foreground/20 transition-colors"
            >
              关闭
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
