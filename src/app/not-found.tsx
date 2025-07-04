import Link from 'next/link';

import { Button } from '@/components/ui/button';

const NotFound = () => {
	return (
		<main className='bg-background grid min-h-full place-items-center px-4 py-20 sm:py-32 lg:px-8'>
			<div className='text-center'>
				<p className='text-accent text-9xl font-semibold'>404</p>
				<h1 className='text-foreground mt-4 text-5xl font-semibold tracking-tight text-balance sm:text-7xl'>
					Page not found
				</h1>
				<p className='text-muted mt-6 text-lg font-medium text-pretty sm:text-xl/8'>
					Sorry, we couldn’t find the page you’re looking for.
				</p>
				<Button asChild className='mt-10 font-medium text-white'>
					<Link href='/'>Go back home</Link>
				</Button>
			</div>
		</main>
	);
};

export default NotFound;
