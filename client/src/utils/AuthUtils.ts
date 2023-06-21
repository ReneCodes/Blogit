import {NavigateFunction} from 'react-router-dom';

type FetchAuthUserType = (
	setAuth: React.Dispatch<React.SetStateAction<null>>,
	setReload: React.Dispatch<React.SetStateAction<boolean>>,
	navigate: NavigateFunction
) => Promise<void | {res: Response; data: any}>;

export const fetchAuthUser: FetchAuthUserType = async (setAuth, setReload, navigate) => {
	const token = localStorage.getItem('token');
	if (token) {
		try {
			const res = await fetch(`${process.env.REACT_APP_SERVER}/auth`, {
				method: 'GET',
				headers: {token},
			});
			const data = await res.json();

			if (res.ok) {
				setAuth(data);
				setReload(true);
				return;
			}
			setAuth(null);
			return {res, data};
		} catch (error) {
			console.log(error);
			setAuth(null);
			navigate('/server_down');
		}
	}
};

export const logout: FetchAuthUserType = async (setAuth, setReload, navigate) => {
	try {
		localStorage.removeItem('token');
		setAuth(null);
		setReload(true);
		navigate('/login');
		return;
	} catch (error) {
		navigate('/server_down');
		return;
	}
};

export const loginUser = async (
	credentials: any,
	setReload: React.Dispatch<React.SetStateAction<boolean>>,
	navigate: NavigateFunction,
	setAuth: React.Dispatch<React.SetStateAction<null>>
) => {
	try {
		const res = await fetch(`${process.env.REACT_APP_SERVER}/login`, {
			method: 'POST',
			body: JSON.stringify(credentials),
			headers: {'Content-Type': 'application/json'},
		});

		const data = await res.json();
		if (res.ok) {
			localStorage.setItem('token', data.token);
			setAuth(data);
			setReload(true);
			navigate('/');
		} else {
			alert(data);
		}
	} catch (error) {
		navigate('/server_down');
	}
};

export const registerUser = async (
	credentials: any,
	setReload: React.Dispatch<React.SetStateAction<boolean>>,
	navigate: NavigateFunction,
	setAuth: React.Dispatch<React.SetStateAction<null>>
) => {
	try {
		const res = await fetch(`${process.env.REACT_APP_SERVER}/register`, {
			method: 'POST',
			body: JSON.stringify(credentials),
			headers: {'Content-Type': 'application/json'},
		});

		if (res.status !== 201) {
			alert('registration failed');
		} else {
			navigate('/login');
			loginUser(credentials, setReload, navigate, setAuth);
		}
	} catch (error) {
		navigate('/server_down');
	}
};
