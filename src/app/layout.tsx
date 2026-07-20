import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { EditProvider } from '@/hooks/useEditMode';
import EditToggle from '@/components/edit-toggle';

const inter = Inter({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Leoshi 施仲勋 | 艺术 · 设计 · 摄影',
  description:
    'Leoshi（施仲勋）的个人主页 — 跨媒介视觉创作者。作品涵盖极简艺术、平面设计与摄影。',
  keywords: ['Leoshi', '施仲勋', '视觉创作', '艺术', '设计', '摄影', '个人主页'],
  authors: [{ name: 'Leoshi' }],
  openGraph: {
    title: 'Leoshi 施仲勋 | 艺术 · 设计 · 摄影',
    description: '跨媒介视觉创作者。极简艺术、设计与摄影作品集。',
    type: 'website',
    locale: 'zh_TW',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <EditProvider>
            {children}
            <EditToggle />
          </EditProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
