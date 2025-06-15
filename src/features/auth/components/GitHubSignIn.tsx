'use client';

import { Loader2 } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

import { signIn } from '@/lib/auth-client';

import { GitHubIcon } from '@/assets/icons';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

const GitHubSignIn = () => {
	const [isPending, setIsPending] = useState(false);

	const handlesocialLogin = async () => {
		setIsPending(true);

		await signIn.social({
			provider: 'github',
			callbackURL: DEFAULT_LOGIN_REDIRECT,
			errorCallbackURL: '/login/error'
		});

		setIsPending(false);
	};

	return (
		<Button
			variant='outline'
			className='w-full'
			onClick={handlesocialLogin}
			disabled={isPending}
			aria-label='Sign in with GitHub'
		>
			{isPending ? (
				<Loader2 className='size-4 animate-spin' />
			) : (
				<>
					<GitHubIcon />
					GitHub
				</>
			)}
		</Button>
	);
};

export default GitHubSignIn;
