import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <span className="text-5xl">Login</span>
      <form className="mt-5 flex flex-col">
        <label className="my-2.5 mx-0">Email</label>
        <input className="p-2.5 bg-white border-none rounded-lg focus:outline-none" type="text" placeholder="Enter your email..." />
        <label className="my-2.5 mx-0">Password</label>
        <input className="p-2.5 bg-white border-none rounded-lg focus:outline-none" type="password" placeholder="Enter your password..." />
        <button className="mt-5 cursor-pointer bg-lime-600 text-white p-2.5 border-none rounded-lg text-center">Login</button>
      </form>
      <button className="absolute top-20 right-24 bg-red-400 text-white cursor-pointer p-2.5 border-none rounded-lg">
        <Link to="/register">Register</Link>
      </button>
    </div>
  );
};

export default Login;
