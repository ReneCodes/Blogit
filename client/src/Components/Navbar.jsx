import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import gpic from '../images/gpic.jpg';
const Navbar = () => {
  return (
    <div className="w-full h-12 bg-emerald-500 sticky top-0 flex items-center font-lora">
      <div style={{ flex: 3 }} className="flex items-center justify-center">
        <FontAwesomeIcon className="cursor-pointer" icon={faMagnifyingGlass} />
      </div>
      <div style={{ flex: 6 }}>
        <ul className="flex justify-center m-0 p-0 list-none">
          <li className="cursor-pointer font-light text-lg mx-8">HOME</li>
          <li className="cursor-pointer font-light text-lg mx-8">CREATE</li>
          <li className="cursor-pointer font-light text-lg mx-8">LOGOUT</li>
        </ul>
      </div>
      <div style={{ flex: 3 }} className="flex flex-col items-end mx-8">
        <img src={gpic} className="w-10 h-10 rounded-full flex items-center justify-center" alt="profilepic" />
      </div>
    </div>
  );
};

export default Navbar;
