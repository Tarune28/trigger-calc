import logo from './logo.svg';

import './App.css';
import Home from './components/Pages/Home/home';
import Header from './components/header/Header';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            
            <Route path="home" element={<Home/>}/>
            {/* <Route path="studentReports" element={<StudentReport/>} />
            <Route path="logout" element={<LogoutPage/>} /> */}


      
        </Routes>
      </BrowserRouter>
      {/* <Crud/> */}
    </div>
  );
}

export default App;
