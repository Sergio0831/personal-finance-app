import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { ReactNode } from 'react';

import ApolloClientProvider from '@/providers/ApolloClientProvider';

import './globals.css';

const publicSans = localFont({
	variable: '--font-public-sans',
	src: [
		{
			path: '../assets/fonts/PublicSans-VariableFont_wght.woff2',
			weight: '400 700',
			style: 'normal'
		},
		{
			path: '../assets/fonts/PublicSans-Italic-VariableFont_wght.woff2',
			weight: '400 700',
			style: 'italic'
		}
	],
	fallback: [
		'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif'
	]
});

export const metadata: Metadata = {
	title: 'Personal Finance App',
	description:
		'Take control of your money with our personal finance app! Track expenses, set budgets, and achieve financial goals with ease. Simple, secure, and designed to help you make smarter financial decisions.'
};

export default function RootLayout({
	children
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${publicSans.variable} antialiased`}>
				<ApolloClientProvider>{children}</ApolloClientProvider>
			</body>
		</html>
	);
}
