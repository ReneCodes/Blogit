import { Link, useNavigate, NavigateFunction } from 'react-router-dom';
import { useEffect, useState, FC } from 'react';
import SidebarContent from './SidebarContent';
import { getBlog } from "../utils/BlogUtils"
import { BlogInterface } from '../@types/model';


const Sidebar = () => {

  const navigate : NavigateFunction = useNavigate();
  const [blog, setBlog] = useState<BlogInterface[]>([]);

  useEffect(() => {
    getBlog(setBlog, navigate);
  }, []);

  const options = ['Music', 'Travel', 'Technology', 'Science', 'Art', 'Sports', 'Food'];
  const allItems = options.map((item) => {
    return (
      <li className='listItems' key={item}>
        <Link to={`/?cat=${item}`}>{item}</Link>
      </li>
    )
  });

  return (
    <div style={{ flex: 3 }} className="m-5 pb-8 bg-gray-100 flex rounded-lg flex-col items-center h-full">
      <div className="sidebarItem">
        <span className="p-1.5 w-4/5 text-center  font-semibold ">CATEGORIES</span>
        <ul>
          {allItems}
        </ul>
      </div>
      <span className=" w-3/5 mt-10 text-center leading-5 font-semibold">TOP PICKS</span>
      <div className="flex flex-wrap ">{blog && blog.map((blog) => <SidebarContent key={blog._id} blog={blog} />)}</div>
    </div>
  );
};

export default Sidebar;
