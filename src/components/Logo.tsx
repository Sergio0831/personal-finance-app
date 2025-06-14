import { type SVGProps } from 'react';

import { cn } from '@/lib/clsx';

import { LogoLarge } from '@/assets/icons';

const Logo = ({ className }: SVGProps<SVGElement>) => {
	return <LogoLarge className={cn('h-[1.375rem] w-[7.625rem]', className)} />;
};

export default Logo;
