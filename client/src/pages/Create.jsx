import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
const Create = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState('');
  const [redirect, setRedirect] = useState(false);
  async function createBlog(e) {
    e.preventDefault();
    const newBlog = {
      title,
      content,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append('name', filename);
      data.append('file', file);
      newBlog.image = filename;
      try {
        await axios.post('http://localhost:3001/upload', data);
      } catch (err) {}
    }

    const response = await fetch('http://localhost:3001/create', {
      method: 'POST',
      body: JSON.stringify(newBlog),
      headers: { 'Content-Type': 'application/json', token: localStorage.getItem('token') },
      credentials: 'include',
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className="p-12 pr-16">
      {file && <img src={URL.createObjectURL(file)} className="ml-36 h-64 w-[70vw] object-cover rounded-md mb-5" alt="profilepic" />}
      <form className="w-[70vw] " onSubmit={createBlog}>
        <div className="flex flex-col relative ml-36 w-[70vw] mb-5">
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">
            Upload Image
          </label>
          <input
            class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
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
          <div className="p-1 flex flex-col text-xs w-[10vw] m-0">
            <h1 className="text-center text-base">Category</h1>
            <div className="flex items-center">
              <input type="radio" name="cat" value="art" id="art" />
              <label htmlFor="art">Art</label>
            </div>
            <div className="flex items-center">
              <input type="radio" name="cat" value="science" id="science" />
              <label htmlFor="science">Science</label>
            </div>
            <div className="flex items-center">
              <input type="radio" name="cat" value="technology" id="technology" />
              <label htmlFor="technology">Technology</label>
            </div>
            <div className="flex items-center">
              <input type="radio" name="cat" value="music" id="music" />
              <label htmlFor="music">Music</label>
            </div>
            <div className="flex items-center">
              <input type="radio" name="cat" value="sports" id="sports" />
              <label htmlFor="sports">Sports</label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Create;
