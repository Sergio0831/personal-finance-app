import type { SVGProps } from 'react';
import { forwardRef } from 'react';
import { LogoSmall } from '@/assets/icons';
import { cn } from '@/lib/clsx';

const LogoMobile = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  ({ className, ...rest }, ref) => (
    <LogoSmall
      ref={ref}
      {...rest}
      className={cn('h-[1.375rem] w-[0.875rem]', className)}
    />
  )
);

LogoMobile.displayName = 'LogoMobile';

export default LogoMobile;
