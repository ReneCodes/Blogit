import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';

import { AuthContext } from '../context';
import { fetchAuthUser, loginUser } from '../utils/AuthUtils';

function Login() {
  let navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setReload, setAuth } = useContext(AuthContext);

  // CHECKS IF THE USER IS ALREADY AUTHENTICATED WHEN OPENING THE /LOGIN PAGE
  useEffect(() => {
    fetchAuthUser(setAuth, setReload, navigate);
  }, [])

  function handleLogin(e) {
    e.preventDefault();
    loginUser({ username, password }, setReload, navigate, setAuth);
  }

  const inputs = [
    ['Username', 'text', username, setUsername],
    ['Password', 'password', password, setPassword],
  ];
  const allInputs = inputs.map(([item, type, state, setter]) => {
    return (
      <div className='flex flex-col' key={item}>
        <label className="my-2.5 mx-0">{item}</label>
        <input
          className="p-2.5 bg-white border-none rounded-lg focus:outline-none"
          type={type}
          placeholder={`Enter your ${item}...`}
          value={state}
          onChange={(e) => setter(e.target.value)}
        />
      </div>
    )
  });

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <span className="text-5xl">Login</span>
      <form className="mt-5 flex flex-col" onSubmit={handleLogin}>
        {allInputs}
        <button className="mt-5 cursor-pointer bg-lime-600 text-white p-2.5 border-none rounded-lg text-center">Login</button>
        <span className="mt-2.5">
          Don't you have an account?{' '}
          <Link className="ml-1 text-red-600" to="/register">
            Register
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
