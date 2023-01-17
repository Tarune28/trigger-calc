import logo from './logo.svg';

import './App.css';
import Home from './components/Pages/Home/home';
import Header from './components/header/Header';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ComingSoon from './components/Pages/ComingSoon/ComingSoon';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            
            <Route path="home" element={<Home/>}/>
            <Route path="comingSoon" element={<ComingSoon/>} />



      
        </Routes>
      </BrowserRouter>
      {/* <Crud/> */}
    </div>
  );
}

export default App;
