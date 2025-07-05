import Link from 'next/link';

import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <main className="grid min-h-full place-items-center bg-background px-4 py-20 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="font-semibold text-9xl text-accent">404</p>
        <h1 className="mt-4 text-balance font-semibold text-5xl text-foreground tracking-tight sm:text-7xl">
          Page not found
        </h1>
        <p className="mt-6 text-pretty font-medium text-lg text-muted sm:text-xl/8">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <Button asChild className="mt-10 font-medium text-white">
          <Link href="/">Go back home</Link>
        </Button>
      </div>
    </main>
  );
};

export default NotFound;
