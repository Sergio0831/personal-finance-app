import ReturnButton from '@/features/auth/components/ReturnButton';

type PageProps = {
  searchParams: Promise<{ error: string }>;
};

const Page = async ({ searchParams }: PageProps) => {
  const error = (await searchParams).error;

  return (
    <div className="container mx-auto max-w-screen-lg space-y-8 lg:px-8 lg:py-16">
      <div className="space-y-4">
        <ReturnButton
          aria-label="Back to login page"
          href="/login"
          label="Back to Login"
        />

        <h1 className="text-preset-1">Login Error</h1>
      </div>

      <p className="text-destructive text-preset-3">
        {error === 'account_not_linked'
          ? 'This account is already linked to another sign-in method.'
          : 'Oops! Something went wrong. Please try again.'}
      </p>
    </div>
  );
};

export default Page;
