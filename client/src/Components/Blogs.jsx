import Blog from './Blog';
import axios from 'axios';
import { useEffect, useState } from 'react';
const Blogs = () => {
  const [blog, setBlog] = useState([]);
  useEffect(() => {
    const fetchBlog = async () => {
      const res = await axios.get('http://localhost:3001/blog');
      setBlog(res.data);
    };
    fetchBlog();
  }, []);
  return (
    <div style={{ flex: 9 }}>
      <div className="flex flex-wrap m-5">{blog && blog.map((blog) => <Blog key={blog.id} blog={blog} />)}</div>
    </div>
  );
};

export default Blogs;
