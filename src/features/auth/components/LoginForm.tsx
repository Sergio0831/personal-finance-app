'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import { signInWithCredentials } from '../actions/sign-in';
import { LoginSchema, LoginSchemaType } from '../schemas';

import AuthAlert from './AuthAlert';
import AuthWrapper from './AuthWrapper';
import InputWithLabel from './InputWithLabel';
import PasswordInputWithLabel from './PasswordInputWithLabel';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

const LoginForm = () => {
	const [isPending, setTransition] = useTransition();
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	const form = useForm<LoginSchemaType>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	});

	const onSubmit = (formValues: LoginSchemaType) => {
		setTransition(async () => {
			const { error } = await signInWithCredentials(formValues);

			if (error) {
				setError(error);
			} else {
				toast.success('Login successful. Good to have you back.');
				router.push(DEFAULT_LOGIN_REDIRECT);
			}
		});
	};

	return (
		<AuthWrapper
			authMessage='Need to create an account?'
			backButtonLabel='Sign Up'
			backButtonHref='/register'
			heading='Login'
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<InputWithLabel<LoginSchemaType>
						label='Email'
						nameInSchema='email'
						disabled={isPending}
						error={form.formState.errors.email}
						type='email'
					/>
					<PasswordInputWithLabel<LoginSchemaType>
						label='Password'
						nameInSchema='password'
						disabled={isPending}
						error={form.formState.errors.password}
					/>
					{!!error && <AuthAlert error={error} />}
					<Button
						className='w-full text-white'
						disabled={isPending}
						type='submit'
					>
						{isPending ? <Loader2 className='size-4 animate-spin' /> : 'Login'}
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	);
};

export default LoginForm;
