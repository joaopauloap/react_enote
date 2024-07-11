import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Login from "./pages/Login/Login";
import Footer from "./components/Footer/Footer";
import Notes from "./pages/Notes/Notes";
import "./App.css";
import AlertContainer from "./components/Alert/AlertContainer";
import { AlertProvider } from "./contexts/AlertContext";

function App() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  }

  return (
    <AlertProvider>
        {user && <Navbar user={user} onLogout={handleLogout} />}
        <Routes>
          <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
          <Route path="/home" element={user ? <Home /> : <Navigate to="/login" />} />
          <Route path="/about" element={<About />}></Route>
          <Route path="/login" element={user?<Navigate to="/home"/> : <Login setUser={setUser} />} />
          <Route path="/notes" element={user ? <Notes /> : <Navigate to="/login" />} />
        </Routes>
        <Footer></Footer>
        <AlertContainer />
    </AlertProvider>
  );
}

export default App;
