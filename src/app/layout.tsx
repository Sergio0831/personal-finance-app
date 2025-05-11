import type { Metadata } from 'next';
import { Public_Sans } from 'next/font/google';
import './globals.css';
import ApolloClientProvider from '@/providers/ApolloClientProvider';

const publicSans = Public_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-public-sans',
  display: 'swap',
  preload: true,
  style: 'normal',
  fallback: [
    'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif',
  ],
});

export const metadata: Metadata = {
  title: 'Personal Finance App',
  description:
    'Take control of your money with our personal finance app! Track expenses, set budgets, and achieve financial goals with ease. Simple, secure, and designed to help you make smarter financial decisions.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${publicSans.variable} antialiased`}>
        <ApolloClientProvider>{children}</ApolloClientProvider>
      </body>
    </html>
  );
}
