import { Link } from 'react-router-dom';
import moment from 'moment';
const Blog = (props) => {
  const { title, _id, content, image, createdAt, author } = props.blog;
  const capitalize = author?.username.toUpperCase();
  return (
    <div className="w-96 mt-0 mb-10 mx-6">
      <div>
        <img src={image} className="w-full h-64 object-cover rounded-md" alt="profilepic" />
      </div>
      <div className="flex flex-col items-center">
        <div>
          <span className="mr-2.5 text-xs cursor-pointer">Sports</span>
          <span className="mr-2.5 text-xs cursor-pointer">Technology</span>
        </div>
        <span className="blogTitle">
          <Link to={`/blog/${_id}`}>{title}</Link>
        </span>
      </div>
      <div className="flex justify-between">
        <span className="blogDate">Author: {capitalize} </span>
        <span className="blogDate">{moment(createdAt).fromNow()}</span>
      </div>
      <p className="blogDesc">{content}</p>
    </div>
  );
};

export default Blog;
