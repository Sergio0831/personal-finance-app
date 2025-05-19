'use client';

import Link from 'next/link';
import { type PropsWithChildren } from 'react';

import { Button } from '@/components/ui/button';
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
				<CardTitle>{heading}</CardTitle>
			</CardHeader>
			<CardContent>{children}</CardContent>
			<CardFooter>
				<div>
					<p>Or log in with:</p>
					<GitHubSignIn />
				</div>
				<div>
					<p className='text-preset-4'>{authMessage}</p>
					<Link href={backButtonHref}>
						<Button
							variant='link'
							className='text-preset-4 font-bold'
						>
							{backButtonLabel}
						</Button>
					</Link>
				</div>
			</CardFooter>
		</Card>
	);
};

export default AuthWrapper;
