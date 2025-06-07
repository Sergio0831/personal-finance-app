'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import { useRegisterUserMutation } from '@/graphql/generated/output';

import { RegisterSchema, RegisterSchemaType } from '../schemas';

import AuthWrapper from './AuthWrapper';
import InputWithLabel from './InputWithLabel';
import PasswordInputWithLabel from './PasswordInputWithLabel';

const RegisterForm = () => {
	const form = useForm<RegisterSchemaType>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			name: '',
			email: '',
			password: ''
		}
	});

	const [register, { loading }] = useRegisterUserMutation({
		onCompleted: () => {
			console.log('Registration successful');
		},
		onError: error => {
			console.error('GraphQL mutation error:', error);
			form.setError('email', {
				message: error.message || 'An error occurred during registration'
			});
		}
	});

	const onSubmit = (data: RegisterSchemaType) => {
		register({
			variables: {
				input: data
			}
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
						disabled={loading}
						error={form.formState.errors.email}
						type='text'
					/>
					<InputWithLabel<RegisterSchemaType>
						label='Email'
						nameInSchema='email'
						disabled={loading}
						error={form.formState.errors.email}
						type='email'
					/>
					<PasswordInputWithLabel<RegisterSchemaType>
						label='Create Password'
						nameInSchema='password'
						disabled={loading}
						error={form.formState.errors.email}
						createPassword
					/>
					<Button className='w-full' variant='primary' size='lg'>
						Create Account
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	);
};

export default RegisterForm;
