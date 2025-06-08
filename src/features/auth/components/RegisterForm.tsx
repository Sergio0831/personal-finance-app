'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import { register } from '../actions/register';
import { RegisterSchema, RegisterSchemaType } from '../schemas';

import AuthWrapper from './AuthWrapper';
import InputWithLabel from './InputWithLabel';
import PasswordInputWithLabel from './PasswordInputWithLabel';

const RegisterForm = () => {
	const [isPending, setTransition] = useTransition();
	const router = useRouter();

	const form = useForm<RegisterSchemaType>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			name: '',
			email: '',
			password: ''
		}
	});

	const onSubmit = (values: RegisterSchemaType) => {
		setTransition(() => {
			register(values).then(data => {
				form.setError('email', { message: data.error });

				if (!data.error) {
					form.reset();
					router.push('/login');
				}
			});
		});
	};

	return (
		<AuthWrapper
			authMessage='Already have an account?'
			backButtonLabel='Login'
			backButtonHref='/login'
			heading='Sign Up'
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<InputWithLabel<RegisterSchemaType>
						label='Name'
						nameInSchema='name'
						disabled={isPending}
						error={form.formState.errors.email}
						type='text'
					/>
					<InputWithLabel<RegisterSchemaType>
						label='Email'
						nameInSchema='email'
						disabled={isPending}
						error={form.formState.errors.email}
						type='email'
					/>
					<PasswordInputWithLabel<RegisterSchemaType>
						label='Create Password'
						nameInSchema='password'
						disabled={isPending}
						error={form.formState.errors.email}
						createPassword
					/>
					<Button className='w-full' disabled={isPending} type='submit'>
						Create Account
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	);
};

export default RegisterForm;
