'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { InputWithLabel } from '@/components/custom';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { signUpWithCredentials } from '../actions/sign-up';
import { RegisterSchema, type RegisterSchemaType } from '../schemas';
import AuthAlert from './AuthAlert';
import AuthWrapper from './AuthWrapper';
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
      password: '',
    },
  });

  const onSubmit = async (formValues: RegisterSchemaType) => {
    // clear existing error with a low-priority update
    setTransition(() => setError(null));

    const { error: signUpError } = await signUpWithCredentials(formValues);

    setTransition(() => {
      if (signUpError) {
        setError(signUpError);
      } else {
        toast.success('Registration complete. You can login.');
        router.push('/login');
      }
    });
  };
  return (
    <AuthWrapper
      authMessage="Already have an account?"
      backButtonHref="/login"
      backButtonLabel="Login"
      heading="Sign Up"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <InputWithLabel<RegisterSchemaType>
            disabled={isPending}
            error={form.formState.errors.name}
            label="Name"
            nameInSchema="name"
            type="text"
          />
          <InputWithLabel<RegisterSchemaType>
            disabled={isPending}
            error={form.formState.errors.email}
            label="Email"
            nameInSchema="email"
            type="email"
          />
          <PasswordInputWithLabel<RegisterSchemaType>
            createPassword
            disabled={isPending}
            error={form.formState.errors.password}
            label="Create Password"
            nameInSchema="password"
          />
          {!!error && <AuthAlert error={error} />}
          <Button
            aria-label="Create account"
            className="w-full text-white"
            disabled={isPending}
            type="submit"
          >
            {isPending ? (
              <Loader2 className="size-4 animate-spin" />
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
