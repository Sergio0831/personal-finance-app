'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { login } from '../actions';
import { LoginSchema, LoginSchemaType } from '../schemas';

import AuthWrapper from './AuthWrapper';

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
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem className='mb-4'>
								<FormLabel htmlFor={field.name}>
									Email
								</FormLabel>
								<FormControl>
									<Input
										disabled={isPending}
										aria-label={field.name}
										id={field.name}
										error={form.formState.errors.email}
										{...field}
									/>
								</FormControl>
								<FormMessage id={field.name} />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem className='mb-8'>
								<FormLabel htmlFor={field.name}>
									Create Password
								</FormLabel>
								<FormControl>
									<Input
										type='password'
										disabled={isPending}
										aria-label={field.name}
										id={field.name}
										error={form.formState.errors.password}
										{...field}
									/>
								</FormControl>
								<FormMessage id={field.name} />
							</FormItem>
						)}
					/>
					<Button className='w-full'>Login</Button>
				</form>
			</Form>
		</AuthWrapper>
	);
};

export default LoginForm;
