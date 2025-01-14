import React from 'react';
import { Link } from 'react-router-dom';

function Menu() {
  return (
    <nav className="menu">
      <ul>
        <div className="text-background"><h1>EducationalHUB</h1></div>
        <li><Link to="/"></Link></li>
        <li><Link to="/courses"></Link></li>
        <li><Link to="/about"></Link></li>
        <li><Link to="/contact"></Link></li>
      </ul>
    </nav>
  );
}

export default Menu;