import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Importera useAuth

function SideNav() {
  const { isAuthenticated, logout } = useAuth(); // Använd hooken

  return (
    <nav>
      <ul>
        {!isAuthenticated && (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
        {isAuthenticated && (
          <>
            <li><Link to="/">Chat</Link></li>
            <li><button onClick={logout}>Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default SideNav;
