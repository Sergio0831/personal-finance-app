'use client';

import { zodResolver } from '@hookform/resolvers/zod';
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

import { useRegisterUserMutation } from '@/graphql/generated/output';

import { RegisterSchema, RegisterSchemaType } from '../schemas';

import AuthWrapper from './AuthWrapper';

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
			console.log('Registration failed', error.message);
			form.setError('email', {
				message: error.message
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
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem className='mb-4'>
								<FormLabel htmlFor={field.name}>Name</FormLabel>
								<FormControl>
									<Input
										disabled={loading}
										aria-label={field.name}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
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
										aria-label={field.name}
										id={field.name}
										error={form.formState.errors.email}
										disabled={loading}
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
										disabled={loading}
										aria-label={field.name}
										id={field.name}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
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
