export const fetchAuthUser = async (setAuth, setReload, navigate) => {
  const res = await fetch('http://localhost:3001/auth', {
    method: 'GET',
    headers: {
      token: localStorage.getItem('token'),
    },
  });
  const data = await res.json();

  if (res.ok) {
    setAuth(data);
    setReload(false);
    navigate && navigate('/');
  } else {
    setAuth(null);
  }

  return { res, data };
};

export const logout = async (setReload, navigate) => {
  localStorage.removeItem('token');
  setReload(true);
  navigate('/login');
};

export const loginUser = async (credentials, setReload, navigate) => {

  const res = await fetch('http://localhost:3001/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await res.json();
  if (res.ok) {
    localStorage.setItem('token', data.token);
    setReload(true);
    navigate('/');
  } else {
    alert(data);
  }
};

export const registerUser = async (credentials, navigate) => {
  const res = await fetch('http://localhost:3001/register', {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: { 'Content-Type': 'application/json' },
  });

  if (res.status !== 201) {
    alert('registration failed');
  } else {
    navigate('/login');
  }
}
