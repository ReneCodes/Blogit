import Blog from './Blog';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { searchBlog } from '../utils/BlogUtils';

function Blogs () {

  const navigate = useNavigate();
  const [blog, setBlog] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    searchBlog(search, setBlog, navigate);
  }, [search]);

  return (
    <div style={{ flex: 9 }}>
      <div className="flex flex-wrap m-5">{blog && blog.map((blog) => <Blog key={blog._id} blog={blog} />)}</div>
    </div>
  );
};

export default Blogs;
