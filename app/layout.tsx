import type { Metadata } from 'next';
import { Montserrat, Roboto } from 'next/font/google';
import './globals.css';
import { Suspense } from 'react';
import Script from 'next/script';
import { env } from '@/services/env/server';

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['cyrillic'],
});

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['cyrillic'],
});

export const metadata: Metadata = {
  title: 'Store-canary',
  description: 'Practice store',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense>
      <html lang="en">
        <body className={`${roboto.variable} ${montserrat.variable} antialiased`}>
          {children}
          <Script src={'https://api-maps.yandex.ru/v3/?lang=ru_RU&apikey=' + env.YANDEX_MAP_API} strategy="beforeInteractive" />
        </body>
      </html>
    </Suspense>
  );
}
