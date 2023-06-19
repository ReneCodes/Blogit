import Blog from './Blog';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { searchBlog } from '../utils/BlogUtils';

function Blogs() {

  const navigate = useNavigate();
  const [blog, setBlog] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    searchBlog(search, setBlog, navigate);
  }, [search]);

  return (
    <div style={{ flex: 9 }}>
      {blog.length === 0 &&
        <div className='flex flex-col m-5 p-5 align-center justify-center w-1/2'>
          <h2 className='m-auto font-semibold text-2xl	cursor-pointer '>
            No posts to show, yet. Create one <span onClick={() => navigate('/create')} className='text-cyan-400'>here</span>.
          </h2>
        </div>
      }
      <div data-testid="blog-item" className="flex flex-wrap m-5">{blog && blog.map((blog, index) => <Blog key={index} blog={blog} />)}</div>
    </div>
  );
};

export default Blogs;
