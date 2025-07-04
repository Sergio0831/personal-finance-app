import type { Metadata } from 'next';
import { ReactNode } from 'react';

import { Toaster } from '@/components/ui/sonner';

import ApolloClientProvider from '@/providers/ApolloClientProvider';

import './globals.css';
import { publicSans } from '@/ui/fonts';

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
				<Toaster position='top-center' richColors />
			</body>
		</html>
	);
}
