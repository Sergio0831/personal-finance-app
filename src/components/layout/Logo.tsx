import type { SVGProps } from 'react';
import { LogoLarge } from '@/assets/icons';
import { cn } from '@/lib/clsx';

const Logo = ({ className, ...rest }: SVGProps<SVGElement>) => {
  return (
    <LogoLarge
      className={cn('h-[1.375rem] w-[7.625rem]', className)}
      {...rest}
    />
  );
};

export default Logo;
