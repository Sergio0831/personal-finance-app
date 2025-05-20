'use client';

import { Button } from '@/components/ui/button';

import { socialLogin } from '../actions';

const GitHubSignIn = () => {
	return (
		<Button variant='link' size='lg' onClick={() => socialLogin()}>
			GitHub
		</Button>
	);
};

export default GitHubSignIn;
