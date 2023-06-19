import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { updateBlog } from "../utils/BlogUtils";
import CreateChangeBlog from '../Components/ChangeCreateBlog.jsx';

const Edit = () => {

  const { id } = useParams();
  const [redirect, setRedirect] = useState(false);
  const [file, setFile] = useState('');

  function changeBlog(e, title, content, category) {
    e.preventDefault();
    const newBlog = { title, content, category, };
    updateBlog(file, newBlog, id, setRedirect);
  }


  if (redirect) {
    return <Navigate to={'/blog/' + id} />;
  }

  return (
    <div className="p-12 pr-16">
      {file && <img src={URL.createObjectURL(file)} className="ml-36 h-64 w-[70vw] object-cover rounded-md mb-5" alt="profilepic" />}
      <CreateChangeBlog callback={changeBlog} id={id} setFile={setFile} />
    </div>
  );
};
export default Edit;
