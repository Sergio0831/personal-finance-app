'use client';

import Link from 'next/link';
import type { PropsWithChildren } from 'react';

import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import GitHubSignIn from './GitHubSignIn';

interface AuthWrapperProps {
  heading: string;
  backButtonLabel: string;
  backButtonHref: string;
  authMessage: string;
}

const AuthWrapper = ({
  children,
  heading,
  backButtonHref,
  backButtonLabel,
  authMessage,
}: PropsWithChildren<AuthWrapperProps>) => {
  return (
    <Card className="w-full max-w-[35rem]">
      <CardHeader>
        <CardTitle className="text-preset-1">{heading}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className="grid">
        <div className="my-6 space-y-4">
          <div className="relative text-center after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-muted-foreground after:border-t">
            <span className="relative z-10 bg-card px-3 text-center text-muted text-preset-4">
              Or log in with:
            </span>
          </div>
          {/* GitHub Sign In Button */}
          <GitHubSignIn />
        </div>
        <div className="flex items-center justify-center gap-2">
          <p className="text-muted text-preset-4">{authMessage}</p>
          <Link
            className={buttonVariants({
              variant: 'link',
              size: 'link',
            })}
            href={backButtonHref}
          >
            {backButtonLabel}
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AuthWrapper;
