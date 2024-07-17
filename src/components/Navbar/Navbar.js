import React from "react";
import { Link, useNavigate } from "react-router-dom";
import '../Navbar/Navbar.css';

function Navbar() {
  const navigate = useNavigate();

  const logout = e =>{
    localStorage.removeItem('user'); 
    navigate('/login')
  }

  return (
    <nav className="nav-container">
        <Link to="/"><button className="nav-link">Home</button></Link>
        <Link to="/about"><button className="nav-link">Sobre</button></Link>
        <Link to="/notes"><button className="nav-link">Notas</button></Link>
        <a href="#" onClick={logout}>Sair</a>
    </nav>
  );
}

export default Navbar;
