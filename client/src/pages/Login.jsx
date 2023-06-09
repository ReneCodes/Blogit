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
