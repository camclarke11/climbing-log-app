// src/components/NavBar.js

import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/climbing-gym-map">Climbing Gym Map</Link>
        </li>
        <li>
          <Link to="/admin">Admin Panel</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
