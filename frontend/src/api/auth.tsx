import axios from 'axios';

export const registration = async (user: { name: string; email: string; password: string }) => {
	try {
		const response = await axios.post('http://localhost:4200/auth/register', user);
		console.log(response.data.message);
	} catch (e) {
		console.log(e);
	}
};
