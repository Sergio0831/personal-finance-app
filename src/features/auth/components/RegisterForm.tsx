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
							<FormItem>
								<div>
									<FormLabel>Name</FormLabel>
									<FormMessage />
								</div>
								<FormControl>
									<Input disabled={loading} {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<div>
									<FormLabel>Email</FormLabel>
									<FormMessage />
								</div>
								<FormControl>
									<Input disabled={loading} {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<div>
									<FormLabel>Create Password</FormLabel>
									<FormMessage />
								</div>
								<FormControl>
									<Input
										type='password'
										disabled={loading}
										{...field}
									/>
								</FormControl>
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
