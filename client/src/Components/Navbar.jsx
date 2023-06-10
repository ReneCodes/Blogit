import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import gpic from '../images/gpic.jpg';
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const user = false;
  return (
    <div className="w-full h-12  bg-white sticky top-0 flex items-center font-lora">
      <div style={{ flex: 3 }} className="flex items-center justify-center">
        <img src={logo} className="w-30 h-10" alt="logo" />
      </div>
      <div style={{ flex: 6 }}>
        <ul className="flex justify-center m-0 p-0 list-none">
          <li className="cursor-pointer font-light text-lg mx-8">
            <Link to="/">HOME</Link>
          </li>
          <li className="cursor-pointer font-light text-lg mx-8">
            <Link to="/create">CREATE</Link>
          </li>
          <li className="cursor-pointer font-light text-lg mx-8">{user && 'LOGOUT'}</li>
        </ul>
      </div>
      <div style={{ flex: 3 }} className="flex items-end h-4/6">
        {user ? (
          <img src={gpic} className="w-10 h-10 rounded-full flex items-center justify-center" alt="profilepic" />
        ) : (
          <ul className="cursor-pointer font-light text-lg mx-8">
            <Link to="/login" className="mr-5">
              LOGIN
            </Link>
            <Link to="/register">REGISTER</Link>
          </ul>
        )}
        <FontAwesomeIcon className="cursor-pointer w-5 h-7" icon={faMagnifyingGlass} />
        <input type="text" placeholder="Search here" className="h-full rounded-md mr-5 ml-2 w-24" />
      </div>
    </div>
  );
};

export default Navbar;
