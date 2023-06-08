// import logo from './images/logo.png';

import './App.css';
import Navbar from './Components/Navbar';
import Create from './pages/Create';
import Home from './pages/Home';
import SingleBlog from './pages/SingleBlog';
function App() {
  return (
    <div>
      <Navbar />

      <Create />
    </div>
  );
}

export default App;
