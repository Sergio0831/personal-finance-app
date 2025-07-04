import { Public_Sans } from 'next/font/google';

export const publicSans = Public_Sans({
	subsets: ['latin'],
	variable: '--font-public-sans',
	display: 'swap',
	weight: ['400', '500', '700'],
	fallback: ['system-ui', 'sans-serif'],
	preload: true
});
