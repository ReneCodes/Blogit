import { useEffect, useState, useContext } from 'react';

import Usersolo from '../Components/Usersolo';
import { AuthContext } from '../context';
import { getUserBlogs } from "../utils/BlogUtils.js";
import { useNavigate } from 'react-router-dom';

function UserPage() {

  let navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    console.log(auth);
    getUserBlogs(auth, setBlog, navigate);
  }, []);

  return (
    <div>
      <span className="flex flex-col font-open items-center text-3xl font-semibold italic color text-gray-800">My Blogs</span>
      {blog.length === 0 &&
        <div className='flex flex-col m-5 p-5 align-center justify-center'>
          <h2 className='m-auto font-semibold text-2xl	cursor-pointer '>
            No posts to show, yet. Create one <span onClick={() => navigate('/create')} className='text-cyan-400'>here</span>.
          </h2>
        </div>
      }
      <div className=" mt-10 p-10 ml-50 flex justify-center items-center">
        <div data-testid="blog-item" className="flex">{blog && blog.map((blog) => <Usersolo key={blog._id} blog={blog} />)}</div>
      </div>
    </div>
  );
};

export default UserPage;
