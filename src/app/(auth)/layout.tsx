import AuthIllustration from '@/features/auth/components/AuthIllustration';

type Props = {
	children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
	return (
		<main className='mx-auto h-full max-w-[120rem] md:grid md:grid-cols-8'>
			<div className='p-5 md:col-span-4 xl:col-span-3 2xl:col-span-3'>
				<AuthIllustration />
			</div>
			<div className='grid place-items-center px-10 py-8 md:col-span-4 xl:col-span-5'>
				{children}
			</div>
		</main>
	);
};

export default AuthLayout;
