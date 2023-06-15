import Blog from './Blog';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function Blogs () {
  const [blog, setBlog] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const updateBlog = async () => {
      const res = await axios.get(`${process.env.REACT_APP_SERVER}/blog` + search);
      setBlog(res.data);
    };
    updateBlog();
  }, [search]);
  return (
    <div style={{ flex: 9 }}>
      <div className="flex flex-wrap m-5">{blog && blog.map((blog) => <Blog key={blog._id} blog={blog} />)}</div>
    </div>
  );
};

export default Blogs;
