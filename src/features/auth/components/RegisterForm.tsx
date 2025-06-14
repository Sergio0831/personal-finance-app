'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import { signUpWithCredentials } from '../actions/sign-up';
import { RegisterSchema, RegisterSchemaType } from '../schemas';

import AuthAlert from './AuthAlert';
import AuthWrapper from './AuthWrapper';
import InputWithLabel from './InputWithLabel';
import PasswordInputWithLabel from './PasswordInputWithLabel';

const RegisterForm = () => {
	const [isPending, setTransition] = useTransition();
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	const form = useForm<RegisterSchemaType>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			name: '',
			email: '',
			password: ''
		}
	});

	const onSubmit = (formValues: RegisterSchemaType) => {
		setTransition(async () => {
			const { error } = await signUpWithCredentials(formValues);

			if (error) {
				setError(error);
			} else {
				toast.success('Registration complete. You can login.');
				router.push('/login');
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
						disabled={isPending}
						error={form.formState.errors.name}
						type='text'
						name='name'
					/>
					<InputWithLabel<RegisterSchemaType>
						label='Email'
						nameInSchema='email'
						disabled={isPending}
						error={form.formState.errors.email}
						type='email'
						name='email'
					/>
					<PasswordInputWithLabel<RegisterSchemaType>
						label='Create Password'
						nameInSchema='password'
						disabled={isPending}
						error={form.formState.errors.password}
						createPassword
						name='password'
					/>
					{!!error && <AuthAlert error={error} />}
					<Button
						className='w-full'
						disabled={isPending}
						type='submit'
						aria-label='Create account'
					>
						{isPending ? (
							<Loader2 className='size-4 animate-spin' />
						) : (
							'Create account'
						)}
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	);
};

export default RegisterForm;
