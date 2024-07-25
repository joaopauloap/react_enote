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
        <Link to="/profile">{user.name}</Link>
        <Link onClick={onLogout}>Sair</Link>
      </div>
    </nav>
  );
}

export default Navbar;
