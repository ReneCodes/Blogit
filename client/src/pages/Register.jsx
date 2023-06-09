import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <span className="text-5xl">Register</span>
      <form className="mt-5 flex flex-col">
        <label className="my-2.5 mx-0">Username</label>
        <input className="p-2.5 bg-white border-none rounded-lg focus:outline-none" type="text" placeholder="Create your username..." />
        <label className="my-2.5 mx-0">Email</label>
        <input className="p-2.5 bg-white border-none rounded-lg focus:outline-none" type="text" placeholder="Create your email..." />
        <label className="my-2.5 mx-0">Password</label>
        <input className="p-2.5 bg-white border-none rounded-lg focus:outline-none" type="password" placeholder="Create your password..." />
        <button className="mt-5 cursor-pointer bg-lime-600 text-white p-2.5 border-none rounded-lg text-center">Register</button>
        <span>
          Already have an account?
          <Link className="text-sky-600" to="/login">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
