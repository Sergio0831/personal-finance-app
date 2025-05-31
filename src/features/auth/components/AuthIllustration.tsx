'use client';

import Image from 'next/image';

import Logo from '@/components/Logo';

const AuthIllustration = () => {
	return (
		<div className='bg-foreground relative grid justify-center overflow-hidden rounded-b-md px-10 py-6 md:h-full md:content-between md:rounded-md md:p-10'>
			<Logo className='z-10' />
			<Image
				className='hidden md:block'
				src='/images/illustration.png'
				fill={true}
				alt='Login and Signup Illustration'
				priority={true}
				loading='eager'
				placeholder='blur'
				blurDataURL='/images/illustration.png'
			/>
			<div className='z-10 hidden text-white md:block'>
				<h1 className='text-preset-1 mb-6'>
					Keep track of your money and save for your future
				</h1>
				<p className='text-preset-4'>
					Personal finance app puts you in control of your spending.
					Track transactions, set budgets, and add to savings pots
					easily.
				</p>
			</div>
		</div>
	);
};

export default AuthIllustration;
