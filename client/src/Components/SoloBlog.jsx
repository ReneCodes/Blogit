import gpic from '../images/gpic.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { faUserPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
const SoloBlog = () => {
  const location = useLocation();
  const path = location.pathname.split('/')[2];
  const [blog, setBlog] = useState({});
  useEffect(() => {
    const fetchBlog = async () => {
      const res = await axios.get(`http://localhost:3001/blog/${path}`);
      setBlog(res.data);
    };
    fetchBlog();
  }, [path]);
  const capitalize = blog.author?.username.toUpperCase();

  return (
    <div className="m-10">
      <div>
        <img src={gpic} className="w-full h-96 object-cover rounded-md" alt="profilepic" />
        <h1 className="text-3xl text-center">
          {blog.title}
          <div className="float-right text-base">
            <FontAwesomeIcon icon={faUserPen} className="cursor-pointer  ml-3" />
            <FontAwesomeIcon icon={faTrashCan} className="cursor-pointer ml-3" />
          </div>
        </h1>
        <div className="mt-5 mb-4 flex justify-between">
          <span>Authored by: {capitalize}</span>
          <span>{moment(blog.createdAt).fromNow()}</span>
        </div>
        <p className="first-letter:ml-5 first-letter:text-3xl first-letter:text-blue-600 first-letter:pr-0">{blog.content}</p>
      </div>
    </div>
  );
};

export default SoloBlog;
