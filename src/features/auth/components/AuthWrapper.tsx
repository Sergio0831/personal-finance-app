'use client';

import Link from 'next/link';
import { type PropsWithChildren } from 'react';

import { buttonVariants } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card';

import GitHubSignIn from './GitHubSignIn';

interface AuthWrapperProps {
	heading: string;
	backButtonLabel: string;
	backButtonHref: string;
	authMessage: string;
}

const AuthWrapper = ({
	children,
	heading,
	backButtonHref,
	backButtonLabel,
	authMessage
}: PropsWithChildren<AuthWrapperProps>) => {
	return (
		<Card className='max-w-[26.375rem]'>
			<CardHeader>
				<CardTitle className='text-preset-1'>{heading}</CardTitle>
			</CardHeader>
			<CardContent>{children}</CardContent>
			<CardFooter className='grid'>
				<div className='my-8 space-y-4'>
					<p className='text-muted text-center text-sm'>
						Or log in with:
					</p>
					<GitHubSignIn />
				</div>
				<div className='flex items-center justify-center gap-2'>
					<p className='text-preset-4 text-muted'>{authMessage}</p>
					<Link
						href={backButtonHref}
						className={buttonVariants({
							variant: 'link',
							size: 'link'
						})}
					>
						{backButtonLabel}
					</Link>
				</div>
			</CardFooter>
		</Card>
	);
};

export default AuthWrapper;
