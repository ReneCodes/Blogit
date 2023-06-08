import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const Create = () => {
  return (
    <div className="pt-12">
      <form className="writeForm">
        <div className="flex flex-col ml-36">
          <input type="file" />
          <input type="title" placeholder={'Title'} autoFocus={true} />
        </div>
        <div className="ml-36 border-none">
          <ReactQuill placeholder="create your blog.." className="border-none " />
          <button className="">publish</button>
        </div>
      </form>
    </div>
  );
};

export default Create;
