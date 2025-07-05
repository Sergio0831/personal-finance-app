'use client';

import Image from 'next/image';

import Logo from '@/components/Logo';

const AuthIllustration = () => {
  return (
    <div className="relative grid justify-center overflow-hidden rounded-b-md bg-foreground px-10 py-6 md:h-full md:content-between md:rounded-md md:p-10">
      <Logo className="z-10" />
      <div className="hidden md:block">
        <Image
          alt="Login and Signup Illustration"
          blurDataURL="/images/illustration.png"
          fill={true}
          loading="eager"
          placeholder="blur"
          priority={true}
          src="/images/illustration.png"
        />
        <div className="z-10 text-white">
          <h1 className="mb-6 text-preset-1">
            Keep track of your money and save for your future
          </h1>
          <p className="text-preset-4">
            Personal finance app puts you in control of your spending. Track
            transactions, set budgets, and add to savings pots easily.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthIllustration;
