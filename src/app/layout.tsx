import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { Toaster } from '@/components/ui/sonner';

import ApolloClientProvider from '@/providers/ApolloClientProvider';

import './globals.css';
import {
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
} from '@/lib/seo.constants';
import { publicSans } from '@/ui/fonts';

export const metadata: Metadata = {
  title: {
    absolute: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [
    {
      name: 'Sergejs',
      url: new URL('https://github.com/Sergio0831'),
    },
  ],
  keywords: SITE_KEYWORDS,
  generator: 'Next.js',
  creator: 'Sergejs',
  publisher: 'Sergejs',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    other: {
      rel: 'touch-icon',
      url: '/apple-touch-icon.png',
      sizes: '180x180',
      type: 'image/png',
    },
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${publicSans.variable} antialiased`}>
        <ApolloClientProvider>{children}</ApolloClientProvider>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
