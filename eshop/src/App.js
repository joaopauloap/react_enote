import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Login from "./pages/Login/Login";
import Footer from "./components/Footer/Footer";
import Notes from "./pages/Notes/Notes";

function App() {

  const [userData, setUserData] = useState(null);
  const handleLoginData = (data) => {
      setUserData(data); 
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Router>
      {userData && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/login" element={<Login onLogin={handleLoginData} />}></Route>
        <Route path="/notes" element={<Notes />}></Route>
      </Routes>
      <Footer></Footer>
    </Router>
  );
}

export default App;
