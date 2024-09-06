// src/components/Login.jsx
import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [csrfToken, setCsrfToken] = useState("")
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const Navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await axios.post('https://chatify-api.up.railway.app/auth/token', {
        username,
        password,
        csrfToken
      }, {
      
      });
      Navigate("/chat");
      const { token } = response.data;
      localStorage.setItem('jwtToken', token);
    } catch (error) {
      setError('Error logging in');
    }
  };
  useEffect(() => {
    fetch('https://chatify-api.up.railway.app/csrf', {
        method: 'PATCH',
    })
        .then(res => res.json())
        .then(data => {
            setCsrfToken(data.csrfToken)
            console.log("CSRF Token fetched:", data.csrfToken)
        })
        .catch((error) => {
            console.error("Error Fetching CSRF token:", error)
        })

}, []);
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
