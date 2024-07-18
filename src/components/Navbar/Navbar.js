import React from "react";
import { Link } from "react-router-dom";
import '../Navbar/Navbar.css';

function Navbar({ onLogout, user }) {

  return (
    <nav className="nav-container">
      <div>
        <Link to="/"><button className="nav-link">Home</button></Link>
        <Link to="/about"><button className="nav-link">Sobre</button></Link>
        <Link to="/notes"><button className="nav-link">Notas</button></Link>
      </div>
      <div className="logout-container">
        <Link to="/profile"><a>{user.name}</a></Link>
        <a href="" onClick={onLogout}>Sair</a>
      </div>
    </nav>
  );
}

export default Navbar;
