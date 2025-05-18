'use client';

import { login } from '@/features/auth/actions';

import { Button } from '@/components/ui/button';

const GitHubSignIn = () => {
	return (
		<Button variant='primary' size='lg' onClick={() => login()}>
			GitHub
		</Button>
	);
};

export default GitHubSignIn;
