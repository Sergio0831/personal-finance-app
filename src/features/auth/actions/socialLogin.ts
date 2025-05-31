'use server';

import { signIn } from '../auth';

export const socialLogin = async () => {
	await signIn('github', {
		redirectTo: '/overview'
	});
};
