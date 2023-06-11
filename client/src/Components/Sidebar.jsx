import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import SidebarContent from './SidebarContent';
const Sidebar = () => {
  const [blog, setBlog] = useState([]);
  useEffect(() => {
    const fetchBlog = async () => {
      const res = await axios.get('http://localhost:3001/blog');
      setBlog(res.data.slice(-2));
    };
    fetchBlog();
  }, []);
  return (
    <div style={{ flex: 3 }} className="m-5 pb-8 bg-gray-100 flex rounded-lg flex-col items-center h-full">
      <span className="p-1.5 w-4/5 m-2.5 text-center leading-5 font-semibold">RELATED BLOGS</span>
      <div className="flex flex-wrap m-5">{blog && blog.map((blog) => <SidebarContent key={blog._id} blog={blog} />)}</div>

      <div className="sidebarItem">
        <span className="p-1.5 w-4/5 m-2.5 text-center leading-5 font-semibold">CATEGORIES</span>
        <ul>
          <li className="listItems">Music</li>
          <li className="listItems">Technology</li>
          <li className="listItems">Travel</li>
          <li className="listItems">Sports</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
