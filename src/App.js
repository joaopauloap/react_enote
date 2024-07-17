import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Login from "./pages/Login/Login";
import Footer from "./components/Footer/Footer";
import Notes from "./pages/Notes/Notes";
import "./App.css";
import AlertContainer from "./components/Alert/AlertContainer";
import { AlertProvider } from "./contexts/AlertContext";
import { UserProvider } from "./contexts/UserContext";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <UserProvider value={{ user, setUser }}>
    <AlertProvider>
      <Router>
        {user && <Navbar />}
        <Routes>
          <Route path="/" element={user==null?<Login/>:<Home />}></Route>
          <Route path="/home" element={user==null?<Login/>:<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/notes" element={user==null?<Login/>:<Notes />}></Route>
        </Routes>
        <Footer></Footer>
        <AlertContainer />
      </Router>
    </AlertProvider>
    </UserProvider>
  );
}

export default App;
