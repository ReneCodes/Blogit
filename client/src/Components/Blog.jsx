import gpic from '../images/gpic.jpg';
const Blog = () => {
  return (
    <div className="w-96 mt-0 mb-10 mx-6">
      <div>
        <img src={gpic} className="w-full h-64 object-cover rounded-md" alt="profilepic" />
      </div>
      <div className="flex flex-col items-center">
        <div>
          <span className="mr-2.5 text-xs cursor-pointer">Sports</span>
          <span className="mr-2.5 text-xs cursor-pointer">Technology</span>
        </div>
        <span className="blogTitle">Lorem ipsum dolor sit</span>
        <span className="blogDate">2 days ago</span>
      </div>
      <p className="blogDesc">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam mollitia enim doloribus laborum. Nostrum consectetur, aut nemo, deserunt ex
        rem esse necessitatibus ullam nihil voluptatum laborum quo, repellendus voluptatibus! Fuga. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Numquam mollitia enim doloribus laborum. Nostrum consectetur, aut nemo, deserunt ex rem esse necessitatibus ullam nihil voluptatum
        laborum quo, repellendus voluptatibus! Fuga. Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam mollitia enim doloribus laborum.
        Nostrum consectetur, aut nemo, deserunt ex rem esse necessitatibus ullam nihil voluptatum laborum quo, repellendus voluptatibus! Fuga.
      </p>
    </div>
  );
};

export default Blog;
