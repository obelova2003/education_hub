import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

function Menu() {
  return (
    <nav className="menu">
      <ul>
        <li>
          <Link to="/" className="educational-hub">EducationalHUB</Link>
        </li>
        <li>
          <Link to="/forum">Форум</Link>
        </li>
        <li>
          <Link to="/courses">Курсы</Link>
        </li>
        <li>
          <Link to="/courses_add">Добавить курс</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Menu;