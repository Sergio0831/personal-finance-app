import { logout } from '@/features/auth/actions';
import User from '@/features/user/components/User';

import { Button } from '@/components/ui/button';

const Dashboard = () => {
	return (
		<div>
			<h1>Dashboard Page</h1>;
			<User />
			<Button onClick={logout} />
		</div>
	);
};

export default Dashboard;
