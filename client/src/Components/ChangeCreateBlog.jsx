import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import { getSpecificBlog } from '../utils/BlogUtils';


function CreateChangeBlog({ callback, id, setFile}) {

  const [category, setCategory] = useState('music');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const onOptionChange = (e) => {
    setCategory(e.target.value);
  };

  useEffect(() => {
    if(id){
      getSpecificBlog(setTitle, setContent, setCategory, id);
    }
  }, []);

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
    <form className="w-[70vw] " data-testid="form" onSubmit={(e) => callback(e, title, content, category)}>
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
          onChange={(e) => {
            setTitle(e.target.value);
          }}
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
        <div data-testid="options_container" className="p-1 flex flex-col text-xs w-[10vw] m-0">
          <h1 className="text-center text-base">Category</h1>
          {allOptions}
        </div>
      </div>
    </form>
  )
}

export default CreateChangeBlog;