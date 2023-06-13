import { Link } from 'react-router-dom';
import moment from 'moment';
const Blog = (props) => {
  const folder = 'http://localhost:3001/images/';
  const { title, _id, content, image, createdAt, author, category } = props.blog;
  const capitalize = author?.username;
  return (
    <div className="w-96 mt-0 mb-10 mx-6">
      <div>
        <img src={folder + image} className="w-full h-64 object-cover rounded-md" alt="profilepic" />
      </div>
      <div className="flex flex-col items-center">
        <div>
          <span className="mr-2.5 text-xs cursor-pointer">
            <Link to={`/?cat=${category}`}>{category}</Link>
          </span>
        </div>
        <span className="blogTitle">
          <Link to={`/blog/${_id}`}>{title}</Link>
        </span>
      </div>
      <div className="flex justify-between">
        <span className="blogDate flex">
          Author:
          <p className="ml-1">
            <Link to={`/?user=${author?.username}`}>{capitalize}</Link>
          </p>
        </span>
        <span className="blogDate">{moment(createdAt).fromNow()}</span>
      </div>
      <div className="blogDesc" dangerouslySetInnerHTML={{ __html: content }} />

      <span className="text-xs text-slate-400 mt-3">
        <Link to={`/?user=${author?.username}`}>Read more from same author</Link>
      </span>
    </div>
  );
};

export default Blog;
