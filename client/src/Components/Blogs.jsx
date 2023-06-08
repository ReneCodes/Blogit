import Blog from './Blog';

const Blogs = () => {
  return (
    <div style={{ flex: 9 }}>
      <div className="flex flex-wrap m-5">
        <Blog />
        <Blog />
      </div>
    </div>
  );
};

export default Blogs;
