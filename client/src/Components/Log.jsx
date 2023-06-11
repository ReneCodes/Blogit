import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gpic from '../images/gpic.jpg';
import { UserContext } from '../UserContext';

const Log = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch('http://localhost:3001/profile', {
      credentials: 'include',
    }).then((response) => {
      response.json().then((userInf) => {
        setUserInfo(userInf.username);
      });
    });
  }, [setUserInfo]);
  const capitalize = (name) => {
    return name.toUpperCase();
  };

  const Logout = () => {
    setUserInfo(null);
  };

  const username = userInfo?.username;
  return (
    <div>
      {username ? (
        <div className="flex justify-center mt-2">
          <div>
            <p className="cursor-pointer font-light text-lg mr-4"> {`HI ${capitalize(username)}`}</p>
          </div>
          <span className="cursor-pointer font-light text-lg mr-4" onClick={Logout}>
            LOGOUT
          </span>
          <div>
            <img src={gpic} className="ml-20 w-8 h-8 rounded-full items-center cursor-pointer" alt="profilepic" />
          </div>
        </div>
      ) : (
        <ul className="cursor-pointer font-light text-lg mx-8">
          <Link to="/login" className="mr-5">
            LOGIN
          </Link>
          <Link to="/register">REGISTER</Link>
        </ul>
      )}
    </div>
  );
};

export default Log;
