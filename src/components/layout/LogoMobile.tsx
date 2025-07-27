import type { SVGProps } from 'react';
import { LogoSmall } from '@/assets/icons';
import { cn } from '@/lib/clsx';

const LogoMobile = ({ className, ...rest }: SVGProps<SVGSVGElement>) => (
  <LogoSmall {...rest} className={cn('h-[1.375rem] w-[0.875rem]', className)} />
);
export default LogoMobile;
