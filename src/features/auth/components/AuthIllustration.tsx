import Image from 'next/image';

import { LogoLarge } from '@/assets/icons';

const AuthIllustration = () => {
	return (
		<div className='relative grid h-full content-between p-10'>
			<LogoLarge className='z-10 h-[1.375rem] w-[7.625rem]' />
			<Image
				className='rounded-xl'
				src='/images/illustration.png'
				fill={true}
				alt='Login and Signup Illustration'
				priority={true}
				loading='eager'
				placeholder='blur'
				blurDataURL='/images/illustration.png'
			/>
			<div className='z-10 text-white'>
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
