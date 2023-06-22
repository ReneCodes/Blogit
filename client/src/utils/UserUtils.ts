import axios from 'axios';
import {NavigateFunction} from 'react-router-dom';
import {AuthType} from '../@types/auth';
import {User} from '../@types/model';
import {logout} from './AuthUtils';

export const deleteUser = async (
	auth: AuthType,
	setAuth: React.Dispatch<React.SetStateAction<null>>,
	setReload: React.Dispatch<React.SetStateAction<boolean>>,
	navigate: NavigateFunction
) => {
	try {
		await axios
			.delete(`${process.env.REACT_APP_SERVER}/profile/${auth._id}`, {
				headers: {'Content-Type': 'application/json', token: localStorage.getItem('token')},
				data: {},
			})
			.then(() => {
				logout(setAuth, setReload, navigate);
			});
	} catch (error) {
		if (axios.isAxiosError(error)) {
			navigate('/server_down');
			return error.message;
		} else {
			navigate('/server_down');
			return 'An unexpected error occurred';
		}
	}
};

export const updateUserInformation = async (
	updateUser: User,
	file: File,
	auth: AuthType,
	navigate: NavigateFunction
) => {
	if (file) {
		const data = new FormData();
		const filename = Date.now() + file.name;
		data.append('name', filename);
		data.append('file', file);
		updateUser.image = filename;
		try {
			await axios.post(`${process.env.REACT_APP_SERVER}/upload`, data);
			await axios
				.put(`${process.env.REACT_APP_SERVER}/profile/${auth._id}`, updateUser, {
					headers: {'Content-Type': 'application/json', token: localStorage.getItem('token'), withCredentials: true},
				})
				.then(() => {
					navigate('/');
				});
		} catch (error) {
			if (axios.isAxiosError(error)) {
				navigate('/server_down');
				return error.message;
			} else {
				navigate('/server_down');
				return 'An unexpected error occurred';
			}
		}
	}
};
