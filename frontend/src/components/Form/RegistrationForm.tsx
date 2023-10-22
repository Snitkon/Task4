import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { IForm } from '../../models/user';
import { registration } from '../../api/auth';

function RegistrationForm() {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<IForm>();

	const submit: SubmitHandler<IForm> = data => {
		registration(data)
		console.log('Correct', data);
	};

	const error: SubmitErrorHandler<IForm> = data => {
		console.log('Error', data);
	};

	return (
		<>
			<form onSubmit={handleSubmit(submit, error)}>
				<input type='text' {...register('name', { required: true })} />
				<input type='text' {...register('email', { required: true })} />
				<input type='text' {...register('password')} />
				<button>Sign up</button>
			</form>
		</>
	);
}

export default RegistrationForm;
