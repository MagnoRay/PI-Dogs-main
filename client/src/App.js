import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";
// "react-router-dom": "^5.2.0",
import Home from './components/Home/Home';
import Landing from './components/Landing/Landing';
import DogDetail from './components/DogDetail/DogDetail';
import Navbar from './components/Navbar/Navbar';
import FormDogs from './components/FormDogs/FormDogs';

import axios from 'axios';

//axios.defaults.baseURL = "https://pi-dogs-main-production-74cb.up.railway.app/";
axios.defaults.baseURL = "http://localhost:3001";



function App() {  
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== '/' && <Navbar/>}
      {/*{location.pathname !== '/' && <FiltroDogs/>}*/}
      <Routes>
          <Route path='/' element={<Landing/>} />
          <Route path='/home' element={<Home />} />
          <Route path='/detail/:id' element={<DogDetail/>} />
          <Route path='/newdog' element={<FormDogs />} />
      </Routes>
    </div>
  );
}

export default App;
