import UserButton from '@/features/user/components/user-button';

const Overview = () => {
	return (
		<div className='flex items-center justify-between py-2'>
			<h1 className='text-preset-1'>Overview</h1>
			<UserButton />
		</div>
	);
};

export default Overview;
