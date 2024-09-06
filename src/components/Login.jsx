// src/components/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://chatify-api.up.railway.app/auth/token', {
        username,
        password
      }, {
        withCredentials: true // This is important for credentials
      });
      
      const { token } = response.data;
      localStorage.setItem('jwtToken', token); // Save token in localStorage
      // Handle successful login (e.g., redirect to chat page)
    } catch (error) {
      setError('Error logging in');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Login;
