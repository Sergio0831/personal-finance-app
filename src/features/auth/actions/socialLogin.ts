'use server';

import { signIn } from '../../../auth';

import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

export const socialLogin = async () => {
	await signIn('github', {
		redirectTo: DEFAULT_LOGIN_REDIRECT
	});
};
