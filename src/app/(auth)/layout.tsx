import AuthIllustration from '@/features/auth/components/AuthIllustration';

type Props = {
	children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
	return (
		<main className='mx-auto grid h-full max-w-[120rem] grid-rows-[auto_1fr] md:grid-cols-8 md:grid-rows-none'>
			<div className='md:col-span-4 md:p-5 xl:col-span-3 2xl:col-span-3'>
				<AuthIllustration />
			</div>
			<div className='grid place-items-center px-10 py-8 md:col-span-4 xl:col-span-5'>
				{children}
			</div>
		</main>
	);
};

export default AuthLayout;
