import React from 'react';

const SidebarContent = (props) => {
  const { username, title, id, content, image, createdAt } = props.blog;
  return (
    <>
      <div className="sidebarItem">
        <img
          src="https://www.state.gov/wp-content/uploads/2019/04/Science-Technology-shutterstock_449187505.jpg"
          className="mt-3.5 w-full h-44 object-cover rounded-md"
          alt="profilepic"
        />
        <p className="line-clamp-4">{content}</p>
      </div>
    </>
  );
};

export default SidebarContent;
