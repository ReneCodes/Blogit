import React, { useContext, useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { fetchAuthUser, registerUser } from '../utils/AuthUtils';
import { AuthContext } from '../App';


function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const { setReload, setAuth } = useContext(AuthContext);

  let navigate = useNavigate();

  // CHECKS IF THE USER IS ALREADY AUTHENTICATED WHEN OPENING THE /REGISTER PAGE
  useEffect(() => {
    fetchAuthUser(setAuth, setReload, navigate);
  }, [])

  async function handleSubmit(e) {
    e.preventDefault();
    registerUser({ username, password, email }, setReload, navigate);
  }

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <span className="text-5xl">Register</span>
      <form className="mt-5 flex flex-col" onSubmit={handleSubmit}>
        <label className="my-2.5 mx-0">Username</label>
        <input
          className="p-2.5 bg-white border-none rounded-lg focus:outline-none"
          type="text"
          placeholder="Create your username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className="my-2.5 mx-0">Email</label>
        <input
          className="p-2.5 bg-white border-none rounded-lg focus:outline-none"
          type="email"
          placeholder="Create your email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="my-2.5 mx-0">Password</label>
        <input
          className="p-2.5 bg-white border-none rounded-lg focus:outline-none"
          type="password"
          placeholder="Create your password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="mt-5 cursor-pointer bg-lime-600 text-white p-2.5 border-none rounded-lg text-center">Register</button>
        <span className="mt-2.5">
          Already have an account?
          <Link className="text-sky-600 ml-1" to="/login">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
