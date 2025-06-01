import { type SVGProps } from 'react';

import { cn } from '@/lib/utils';

import { LogoSmall } from '@/assets/icons';

const LogoMobile = ({ className }: SVGProps<SVGElement>) => {
	return <LogoSmall className={cn('h-[1.375rem] w-[0.875rem]', className)} />;
};

export default LogoMobile;
