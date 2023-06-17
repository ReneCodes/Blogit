import {Link, NavigateFunction, useNavigate} from 'react-router-dom';
import React, {useState, useContext, useEffect, FC} from 'react';

import {AuthContext} from '../App';
import {fetchAuthUser, loginUser} from '../utils/AuthUtils';
import {AuthContextType} from '../@types/auth';

const Login: FC = () => {
	let navigate: NavigateFunction = useNavigate();

	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const {setReload, setAuth} = useContext<AuthContextType>(AuthContext);

	// CHECKS IF THE USER IS ALREADY AUTHENTICATED WHEN OPENING THE /LOGIN PAGE
	useEffect(() => {
		fetchAuthUser(setAuth, setReload, navigate);
	}, []);

	function handleLogin(e: React.FormEvent) {
		e.preventDefault();
		loginUser({username, password}, setReload, navigate, setAuth);
	}

	type InputTuple = [string, string, string, React.Dispatch<React.SetStateAction<string>>];

	const inputs: [InputTuple, InputTuple] = [
		['Username', 'text', username, setUsername],
		['Password', 'password', password, setPassword],
	];

	const allInputs = inputs.map(([item, type, state, setter]) => {
		return (
			<div
				className="flex flex-col"
				key={item}>
				<label className="my-2.5 mx-0 flex flex-col">
					{item}
					<input
						className="p-2.5 my-2 bg-white border-b-2 outline-none focus:border-b-gray-500"
						type={type}
						placeholder={`Enter your ${item}...`}
						value={state}
						onChange={(e) => setter(e.target.value)}
					/>
				</label>
			</div>
		);
	});

	return (
		<div className="flex flex-col items-center justify-center mt-10">
			<span className="text-5xl">Login</span>
			<form
				className="mt-5 flex flex-col"
				onSubmit={handleLogin}>
				{allInputs}
				<button className="mt-5 cursor-pointer bg-lime-600 text-white p-2.5 border-none rounded-lg text-center hover:bg-lime-700 hover:scale-[1.01] duration-500 active:hover:bg-lime-800 active:scale-[0.98]">
					Login
				</button>
				<span className="mt-2.5">
					Don't you have an account?{' '}
					<Link
						className="ml-1 text-red-600"
						to="/register">
						Register
					</Link>
				</span>
			</form>
		</div>
	);
};

export default Login;
