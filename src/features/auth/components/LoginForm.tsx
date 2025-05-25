'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import { login } from '../actions';
import { LoginSchema, LoginSchemaType } from '../schemas';

import AuthWrapper from './AuthWrapper';
import InputWithLabel from './InputWithLabel';
import PasswordInputWithLabel from './PasswordInputWithLabel';

const LoginForm = () => {
	const [isPending, setTransition] = useTransition();

	const form = useForm<LoginSchemaType>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	});

	const onSubmit = (values: LoginSchemaType) => {
		setTransition(() => {
			login(values).then(data => {
				form.setError('email', { message: data?.error });
				if (!data?.error) form.reset();
			});
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
						error={form.formState.errors.email}
					/>
					<Button className='w-full'>Login</Button>
				</form>
			</Form>
		</AuthWrapper>
	);
};

export default LoginForm;
