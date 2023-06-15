import axios from 'axios';

export const getUserBlogs = async (auth, setBlog) => {
  const res = await axios.get(`${process.env.REACT_APP_SERVER}/blog?user=${auth?.username}`);
  setBlog(res.data);
};

export const searchBlog = async (search, setBlog) =>{
  const res = await axios.get(`${process.env.REACT_APP_SERVER}/blog` + search);
  setBlog(res.data);
}

export const getBlog = async(setBlog)=>{
  const res = await axios.get(`${process.env.REACT_APP_SERVER}/blog`);
  setBlog(res.data.slice(6, -2));
}

export const deleteBlog = async (blog, navigate) => {
  try {
    await axios.delete(`${process.env.REACT_APP_SERVER}/blog/${blog._id}`, {
      headers: { 'Content-Type': 'application/json', token: localStorage.getItem('token') },
      data: {},
    });
    navigate('/');
  } catch (err) {}
}

export const getUserBlog = async (path, setBlog) => {
  const res = await axios.get(`${process.env.REACT_APP_SERVER}/blog/${path}`);
  setBlog(res.data);
}

export const createBlog = async (newBlog, file, setRedirect)=>{

  if (file) {
    const data = new FormData();
    const filename = Date.now() + file.name;
    data.append('name', filename);
    data.append('file', file);
    newBlog.image = filename;
    try {
      await axios.post(`${process.env.REACT_APP_SERVER}/upload`, data);
    } catch (err) {}
  }

  const response = await fetch(`${process.env.REACT_APP_SERVER}/create`, {
    method: 'POST',
    body: JSON.stringify(newBlog),
    headers: { 'Content-Type': 'application/json', token: localStorage.getItem('token') },
    credentials: 'include',
  });

  if (response.ok) {
    setRedirect(true);
  }
}