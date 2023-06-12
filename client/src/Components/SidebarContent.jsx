import React from 'react';

const SidebarContent = (props) => {
  const { username, title, id, content, image, createdAt } = props.blog;
  const folder = 'http://localhost:3001/images/';
  return (
    <>
      <div className="sidebarItem">
        <img src={folder + image} className="mt-3.5 w-full h-44 object-cover rounded-md" alt="profilepic" />

        <div className="line-clamp-4 mt-2 text-xs" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </>
  );
};

export default SidebarContent;
