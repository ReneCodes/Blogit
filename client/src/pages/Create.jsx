import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import gpic from '../images/gpic.jpg';
const Create = () => {
  return (
    <div className="p-12 pr-16">
      <img src={gpic} className="ml-36 h-64 w-[70vw] object-cover rounded-md mb-5" alt="profilepic" />
      <form className="w-[70vw] ">
        <div className="flex flex-col relative ml-36 w-[70vw] mb-5">
          <input type="file" />
          <input type="title" placeholder={'Title'} autoFocus={true} className="text-lg p-2 w-[70vw] mt-5" />
          <button className="absolute top-0 right-0  bg-lime-600 rounded-lg p-1 text-white text-sm">publish</button>
        </div>
        <div className="border-none ml-36 w-[70vw] ">
          <ReactQuill placeholder="Create your blog.." className="border-none  h-60" />
        </div>
      </form>
    </div>
  );
};

export default Create;
