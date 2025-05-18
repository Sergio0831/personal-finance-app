import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { RegisterSchema, RegisterSchemaType } from '../schemas';

const RegisterForm = () => {
	const form = useForm<RegisterSchemaType>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			name: '',
			email: '',
			password: ''
		}
	});

	return <div>RegisterForm</div>;
};

export default RegisterForm;
