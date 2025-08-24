import type { Metadata } from 'next';
import RegisterForm from '@/features/auth/components/RegisterForm';

export const metadata: Metadata = {
  title: 'Create Account',
  description:
    'Sign up to start managing your money—set budgets, track spending, and grow your savings with pots.',
};

const Register = () => {
  return <RegisterForm />;
};

export default Register;
