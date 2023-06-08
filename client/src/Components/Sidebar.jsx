import React from 'react';
import gpic from '../images/gpic.jpg';
const Sidebar = () => {
  return (
    <div style={{ flex: 3 }} className="m-5 pb-8 bg-gray-100 flex rounded-lg flex-col items-center">
      <div className="sidebarItem">
        <span className="p-1.5 w-4/5 m-2.5 text-center leading-5 font-semibold">LATEST BLOGS</span>
        <img src={gpic} className="mt-3.5 object-contain" alt="profilepic" />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid consequuntur odit aliquam harum, odio voluptatum architecto explicabo
          dicta
        </p>
      </div>

      <div className="sidebarItem">
        <span className="p-1.5 w-4/5 m-2.5 text-center leading-5 font-semibold">CATEGORIES</span>
        <ul>
          <li>Music</li>
          <li>Technology</li>
          <li>Travel</li>
          <li>Sports</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
