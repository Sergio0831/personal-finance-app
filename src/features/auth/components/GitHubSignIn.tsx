'use client';

import { Button } from '@/components/ui/button';

import { socialLogin } from '../actions';

import { GitHubIcon } from '@/assets/icons';

const GitHubSignIn = () => {
	return (
		<Button
			variant='outline'
			className='w-full'
			onClick={() => socialLogin()}
		>
			<GitHubIcon />
			GitHub
		</Button>
	);
};

export default GitHubSignIn;
