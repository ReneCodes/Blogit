import axios from 'axios';

export const deleteUser = async (auth, navigate) => {
  try {
    await axios.delete(`${process.env.REACT_APP_SERVER}/profile/${auth._id}`, {
      headers: { 'Content-Type': 'application/json', token: localStorage.getItem('token') },
      data: {},
    });
    navigate('/');
    localStorage.removeItem('token')
  } catch (err) {}
}

export const updateUserInformation = async (updateUser, file, auth, navigate) => {

  if (file) {
    const data = new FormData();
    const filename = Date.now() + file.name;
    data.append('name', filename);
    data.append('file', file);
    updateUser.image = filename;
    try {
      await axios.post(`${process.env.REACT_APP_SERVER}/upload`, data);
    } catch (err) {}
  }

  const response = await fetch(`${process.env.REACT_APP_SERVER}/profile/${auth._id}`, {
    method: 'PUT',
    body: JSON.stringify(updateUser),
    headers: { 'Content-Type': 'application/json', token: localStorage.getItem('token') },
    credentials: 'include',
  });
  if (response.ok) {
    navigate('/');
  }

}