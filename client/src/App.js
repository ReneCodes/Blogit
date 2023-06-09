// import logo from './images/logo.png';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Create from './pages/Create';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SingleBlog from './pages/SingleBlog';
import Navbar from './Components/Navbar';

function App() {
  const user = false;
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />}></Route>
        <Route path="/register" element={user ? <Home /> : <Register />}></Route>
        <Route path="/login" element={user ? <Home /> : <Login />}></Route>
        <Route path="/create" element={user ? <Create /> : <Register />}></Route>
        <Route path="/blog/:blogId" element={<SingleBlog />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
