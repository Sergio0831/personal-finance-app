import { type ComponentProps } from 'react';

import { UserButton } from '@/features/user/components';

import { cn } from '@/lib/clsx';

type PageHeaderProps = ComponentProps<'header'> & {
	title: string;
};

const PageHeader = ({ className, title }: PageHeaderProps) => {
	return (
		<header
			className={cn('flex items-center justify-between sm:py-2', className)}
		>
			<h1 className='text-preset-1 select-none'>{title}</h1>
			<UserButton />
		</header>
	);
};

export default PageHeader;
