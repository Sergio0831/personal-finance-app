import GitHubSignIn from '@/features/auth/components/GitHubSignIn';

export default function Home() {
	return (
		<div className='bg-white'>
			<h1 className='text-preset-1'>Personal Finance App</h1>
			<GitHubSignIn />
		</div>
	);
}
