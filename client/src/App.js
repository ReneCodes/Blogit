// import logo from './images/logo.png';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Create from './pages/Create';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SingleBlog from './pages/SingleBlog';
import Navbar from './Components/Navbar';
import { UserContextProvider } from './UserContext';

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/create" element={<Create />}></Route>
          <Route path="/blog/:blogId" element={<SingleBlog />}></Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
