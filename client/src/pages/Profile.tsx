import React, { useState, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPen } from '@fortawesome/free-solid-svg-icons';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import avatar from '../images/avatar.jpeg';

import { AuthContext } from '../App';
import { deleteUser, updateUserInformation } from '../utils/UserUtils';
import { fetchAuthUser } from '../utils/AuthUtils';

import { AuthContextType } from '../@types/auth';

const Profile : React.FC = () => {

  const folder = process.env.REACT_APP_IMAGE_URL;
  const [file, setFile] = useState<File | undefined>(undefined);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { auth, setAuth, setReload } = useContext<AuthContextType>(AuthContext);
  let navigate: NavigateFunction = useNavigate();

  const inputClassName = "py-5 px-2.5 my-2 h-5 border-b-2 border-b-gray-200 outline-none focus:border-b-gray-500"

  useEffect(() => {
    fetchAuthUser(setAuth, setReload);
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updateUser = {
      username,
      email,
      password,
    };

    updateUserInformation(updateUser, file, auth, navigate)
  };

  const handleDelete = () => {
    deleteUser(auth, navigate);
  };



  return (
    <div className="mt-16 relative flex justify-center align-middle">
      <div className="relative w-6/12 p-5">
        <div className="flex ">
          <span className=" text-3xl mb-5 text-fuchsia-900 ">Update Your Account</span>
          <button
            className="w-40 ml-40 self-center border-none rounded-lg p-2.5 mt-5 cursor-pointer bg-rose-500 hover:bg-pink-950"
            onClick={handleDelete}
          >
            Delete Account
          </button>
        </div>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label className="text-lg mt-5">Profile Picture</label>
          <div className="flex items-center mt-2 mb-2">
            <img
              src={file ? URL.createObjectURL(file) : auth?.image ? folder + '/' + auth?.image : avatar}
              className=" w-16 h-16 rounded-2xl object-cover"
              alt=""
            />
            <label className="text-lg mt-5" 
            // htmlFor="fileInput"
            >
              <FontAwesomeIcon icon={faUserPen} className="cursor-pointer  ml-3" />
            <input
              className="mt-2 mb-2 h-5 border-none border-b-gray-500"
              type="file"
              // id="fileInput"
              style={{ display: 'none' }}
              onChange={(e) => setFile(e.target.files?.[0])}
              />
            </label>
          </div>
          <label className="text-lg mt-5 flex flex-col">Username
            <input
              className={inputClassName}
              type="text"
              placeholder={auth?.username}
              onChange={(e) => setUsername(e.target.value)}
              />
          </label>
          <label className="text-lg mt-5 flex flex-col">Email
            <input
              className={inputClassName}
              type="email"
              placeholder={auth?.email}
              onChange={(e) => setEmail(e.target.value)}
              />
          </label>
          <label className="text-lg mt-5 flex flex-col">Password
            <input
              className={inputClassName}
              type="password"
              placeholder="Enter new password"
              onChange={(e) => setPassword(e.target.value)}
              />
          </label>
          <button className=" w-40 self-center border-none rounded-lg p-2.5 mt-5 cursor-pointer bg-cyan-500 hover:bg-cyan-600 " type="submit">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
