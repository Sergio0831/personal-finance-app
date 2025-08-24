import type { Metadata } from 'next';
import { LoginForm } from '@/features/auth/components';

export const metadata: Metadata = {
  title: 'Login',
  description:
    'Access your account to track budgets, manage pots, and stay on top of your finances.',
};

const Login = () => {
  return <LoginForm />;
};

export default Login;
