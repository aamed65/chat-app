// src/hooks/useAuth.js
import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [token, setToken] = useState(() => localStorage.getItem('jwtToken')); // Hämta token från localStorage

  useEffect(() => {
    const storedToken = localStorage.getItem('jwtToken');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return { token, setToken };
};
