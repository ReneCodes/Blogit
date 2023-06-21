import React, { useContext, useEffect, useState, FC } from 'react';

import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { fetchAuthUser, registerUser } from '../utils/AuthUtils';
import { AuthContext } from '../App';

import { AuthContextType } from '../@types/auth';


const Register : FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const { setReload, setAuth } = useContext<AuthContextType>(AuthContext);

  let navigate: NavigateFunction = useNavigate();

  // CHECKS IF THE USER IS ALREADY AUTHENTICATED WHEN OPENING THE /REGISTER PAGE
  useEffect(() => {
    fetchAuthUser(setAuth, setReload, navigate);
  }, [])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    registerUser({ username, password, email }, setReload, navigate, setAuth);
  }

  type InputTuple = [string,string,string, React.Dispatch<React.SetStateAction<string>>]

  const inputs: [InputTuple,InputTuple,InputTuple] = [
    ['Username', 'text', username, setUsername],
    ['Email', 'email', email, setEmail],
    ['Password', 'password', password, setPassword],
  ];

  const allInputs = inputs.map(([item, type, state, setter]) => {
    return (
      <div className='flex flex-col' key={item}>
        <label className="my-2.5 mx-0 flex flex-col">{item}
          <input
            className="p-2.5 my-2 bg-white border-b-2 outline-none focus:border-b-gray-500"
            type={type}
            placeholder={`Create your ${item}...`}
            value={state}
            onChange={(e) => setter(e.target.value)}
            />
        </label>
      </div>
    )
  });

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <span className="text-5xl">Register</span>
      <form className="mt-5 flex flex-col" onSubmit={handleSubmit}>
        {allInputs}
        <button className="mt-5 cursor-pointer bg-lime-600 text-white p-2.5 border-none rounded-lg text-center hover:bg-lime-700 hover:scale-[1.01] duration-500 active:hover:bg-lime-800 active:scale-[0.98]">Register</button>
        <span className="mt-2.5">
          Already have an account?
          <Link className="ml-1 text-sky-600" to="/login">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
