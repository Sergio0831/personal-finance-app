'use client';

import { Loader2 } from 'lucide-react';
import { useTransition } from 'react';
import { GitHubIcon } from '@/assets/icons';
import { Button } from '@/components/ui/button';
import { signIn } from '@/lib/auth-client';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

const GitHubSignIn = () => {
  const [isPending, startTransition] = useTransition();

  const handleSocialLogin = () => {
    startTransition(() => {
      signIn.social({
        provider: 'github',
        callbackURL: DEFAULT_LOGIN_REDIRECT,
        errorCallbackURL: '/login/error',
      });
    });
  };

  return (
    <Button
      aria-label="Sign in with GitHub"
      className="w-full"
      disabled={isPending}
      onClick={handleSocialLogin}
      variant="outline"
    >
      {isPending ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <>
          <GitHubIcon />
          GitHub
        </>
      )}
    </Button>
  );
};

export default GitHubSignIn;
