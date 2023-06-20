import axios from 'axios';

export const getUserBlogs = async (auth, setBlog, navigate) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_SERVER}/blog?user=${auth?.username}`);
    setBlog(res.data);
  } catch (error) {
    navigate('/server_down')
  }
};

export const searchBlog = async (search, setBlog, navigate) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_SERVER}/blog` + search);
    setBlog(res.data);
  } catch (error) {
    navigate('/server_down')
  }
}

export const getBlog = async (setBlog, navigate) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_SERVER}/blog`);
    setBlog(res.data.slice(6, -2));
  } catch (error) {
    navigate('/server_down')
  }
}

export const deleteBlog = async (blog, navigate) => {
  try {
    await axios.delete(`${process.env.REACT_APP_SERVER}/blog/${blog._id}`, {
      headers: { 'Content-Type': 'application/json', token: localStorage.getItem('token') },
      data: {},
    });
    navigate('/');
  } catch (err) {
    navigate('/server_down')
  }
}

export const getUserBlog = async (path, setBlog, navigate) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_SERVER}/blog/${path}`);
    Array.isArray(res.data) ? setBlog(res.data[0]) : setBlog(res.data);
  } catch (error) {
    navigate('/server_down')
  }
}

export const createBlog = async (newBlog, file, setRedirect, navigate) => {

  if (file) {
    const data = new FormData();
    const filename = Date.now() + file.name;
    data.append('name', filename);
    data.append('file', file);
    newBlog.image = filename;
    try {
      await axios.post(`${process.env.REACT_APP_SERVER}/upload`, data);
      const response = await fetch(`${process.env.REACT_APP_SERVER}/create`, {
        method: 'POST',
        body: JSON.stringify(newBlog),
        headers: { 'Content-Type': 'application/json', token: localStorage.getItem('token') },
        credentials: 'include',
      });

      if (response.ok) {
        setRedirect(true);
      }

    } catch (err) {
      navigate('/server_down')
    }
  }
}

export const updateBlog = async (file, newBlog, id, setRedirect) => {
  if (file) {
    const data = new FormData();
    const filename = Date.now() + file.name;
    data.append('name', filename);
    data.append('file', file);
    newBlog.image = filename;
    try {
      await axios.post(`${process.env.REACT_APP_SERVER}/upload`, data);
    } catch (err) { }
  }

  const response = await fetch(`${process.env.REACT_APP_SERVER}/edit/${id}`, {
    method: 'PUT',
    body: JSON.stringify(newBlog),
    headers: { 'Content-Type': 'application/json', token: localStorage.getItem('token') },
    credentials: 'include',
  });
  if (response.ok) {
    setRedirect(true);
  }
}

export const getSpecificBlog = async (setTitle, setContent, setCategory, id) => {
  const res = fetch(`${process.env.REACT_APP_SERVER}/blog/${id}`);
  const blogInfo = await res.json();
  setTitle(blogInfo.title);
  setContent(blogInfo.content);
  setCategory(blogInfo.category);
}