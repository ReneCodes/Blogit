import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { createBlog } from '../utils/BlogUtils';

function Create() {

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('music');
  const [content, setContent] = useState('');
  const [file, setFile] = useState('');
  const [redirect, setRedirect] = useState(false);
  const naigate = useNavigate();

  const onOptionChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBlog = { title, content, category };
    createBlog(newBlog, file, setRedirect, naigate);
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }


  const options = ['Art', 'Science', 'Technology', 'Music', 'Sports', 'Travel', 'Food'];
  const allOptions = options.map((item) => {
    return (
      <div key={item} className="flex items-center">
        <input type="radio" name="category" value={item} id={item} checked={category === item} onChange={onOptionChange} />
        <label htmlFor={item}>{item}</label>
      </div>
    )
  });

  return (
    <div className="p-12 pr-16">
      {file && <img src={URL.createObjectURL(file)} className="ml-36 h-64 w-[70vw] object-cover rounded-md mb-5" alt="profilepic" />}
      <form className="w-[70vw] " onSubmit={handleSubmit}>
        <div className="flex flex-col relative ml-36 w-[70vw] mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">
            Upload Image
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="file_input"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="title"
            placeholder={'Title'}
            autoFocus={true}
            className="text-lg p-2 w-[70vw] mt-5"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button className="absolute top-0 right-0 bg-lime-600  rounded-md w-20 text-white text-sm" type="submit">
            publish
          </button>
        </div>
        <div className="border-none flex ml-36 w-[70vw]">
          <ReactQuill
            placeholder="Create your blog.."
            className="border-none w-[68vw] h-60"
            value={content}
            onChange={(newValue) => setContent(newValue)}
          />
          <div className="p-1 flex flex-col text-xs w-[10vw] m-0">
            <h1 className="text-center text-base">Category</h1>
            {allOptions}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Create;
