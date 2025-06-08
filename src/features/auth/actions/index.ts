import { login } from './login';
import { logout } from './logout';
import { register } from './register';
import { socialLogin } from './socialLogin';

export const authActions = {
	login,
	register,
	socialLogin,
	logout
};
