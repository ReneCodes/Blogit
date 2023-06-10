import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';

import Google from '../Components/Google';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  async function handleLogin(e) {
    e.preventDefault();
    const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    if (response.ok) {
      setRedirect(true);
    } else {
      alert('wrong credentials');
    }
  }
  if (redirect) {
    return <Navigate to={'/'} />;
  }
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <span className="text-5xl">Login</span>
      <form className="mt-5 flex flex-col" onSubmit={handleLogin}>
        <label className="my-2.5 mx-0">Username</label>
        <input
          className="p-2.5 bg-white border-none rounded-lg focus:outline-none"
          type="text"
          placeholder="Enter your username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className="my-2.5 mx-0">Password</label>
        <input
          className="p-2.5 bg-white border-none rounded-lg focus:outline-none"
          type="password"
          placeholder="Enter your password..."
          autoComplete="on"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="mt-5 cursor-pointer bg-lime-600 text-white p-2.5 border-none rounded-lg text-center">Login</button>
        <span className="mt-2.5">
          Don't you have an account?{' '}
          <Link className="ml-1 text-red-600" to="/register">
            Register
          </Link>
        </span>
      </form>
      <Google />
    </div>
  );
};

export default Login;
