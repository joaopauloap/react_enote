import React from "react";
import { Link } from "react-router-dom";
import '../Navbar/Navbar.css';

function Navbar() {
  return (
    <nav className="nav-container">
        <Link to="/"><button className="nav-link">Home</button></Link>
        <Link to="/about"><button className="nav-link">Sobre</button></Link>
        <Link to="/notes"><button className="nav-link">Notas</button></Link>
    </nav>
  );
}

export default Navbar;
