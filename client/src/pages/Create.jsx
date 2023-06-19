import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { createBlog } from '../utils/BlogUtils';
import CreateChangeBlog from '../Components/ChangeCreateBlog.jsx';

function Create() {

  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();
  const [file, setFile] = useState('');

  const handleSubmit = (e, title, content, category) => {
    e.preventDefault();
    const newBlog = { title, content, category };
    createBlog(newBlog, file, setRedirect, navigate);
  };

  if (redirect) {
    return <Navigate to={'/'} />;
  };

  return (
    <div className="p-12 pr-16">
      {file && <img src={URL.createObjectURL(file)} className="ml-36 h-64 w-[70vw] object-cover rounded-md mb-5" alt="profilepic" />}
      <CreateChangeBlog callback={handleSubmit} setFile={setFile} />
    </div>
  );
};

export default Create;
