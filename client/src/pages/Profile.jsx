import { useState, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPen } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import avatar from '../images/avatar.jpeg';
import { AuthContext } from '../context';
import { deleteUser, updateUserInformation } from '../utils/UserUtils';
import { fetchAuthUser } from '../utils/AuthUtils';

function Profile() {

  const folder = process.env.REACT_APP_IMAGE_URL;
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { auth, setAuth, setReload } = useContext(AuthContext);
  let navigate = useNavigate();

  useEffect(() => {
    fetchAuthUser(setAuth, setReload);
  }, [])

  const handleSubmit = (e) => {
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
        <form data-testid="form" className="flex flex-col" onSubmit={handleSubmit}>
          <label className="text-lg mt-5">Profile Picture</label>
          <div className="flex items-center mt-2 mb-2">
            <img
              src={file ? URL.createObjectURL(file) : auth?.image ? folder + '/' + auth?.image : avatar}
              className=" w-16 h-16 rounded-2xl object-cover"
              alt=""
            />
            <label className="text-lg mt-5" htmlFor="fileInput">
              <FontAwesomeIcon icon={faUserPen} className="cursor-pointer  ml-3" />
            </label>
            <input
              className="mt-2 mb-2 h-5 border-none border-b-gray-500"
              type="file"
              id="fileInput"
              style={{ display: 'none' }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label className="text-lg mt-5">Username</label>
          <input
            className="mt-2 mb-2 h-5 border-none border-b-gray-500"
            type="text"
            placeholder={auth?.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label className="text-lg mt-5">Email</label>
          <input
            className="mt-2 mb-2 h-5 border-none border-b-gray-500"
            type="email"
            placeholder={auth?.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="text-lg mt-5">Password</label>
          <input
            className="mt-2 mb-2 h-5 border-none border-b-gray-500"
            type="password"
            placeholder="Enter new password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className=" w-40 self-center border-none rounded-lg p-2.5 mt-5 cursor-pointer bg-cyan-500 hover:bg-cyan-600 " type="submit">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
