import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Menu.css';
import logo from './logo.png';

function Menu() {
  const location = useLocation();

  return (
    <nav className="menu">
      <div className="menu-left">
        <Link to="/" className="educational-hub">
          <img src={logo} alt="Логотип EducationalHUB" className="logo" />
        </Link>
      </div>
      <div className="menu-center">
        <Link 
          to="/forum" 
          className={`forum-link ${location.pathname === '/forum' ? 'active' : ''}`}
        >
          форум
        </Link>
        <Link 
          to="/courses" 
          className={`courses-link ${location.pathname === '/courses' ? 'active' : ''}`}
        >
          курсы
        </Link>
      </div>
      <div className="menu-right">
        <Link to="/auth" className="add-auth-link">вход</Link>
      </div>
    </nav>
  );
}

export default Menu;