// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login'; // Importera med stor bokstav
import Chat from './components/Chat';
import SideNav from './components/SideNav';
import './App.css';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <div className="App">
      
        <SideNav /> {/* Om du har en navigeringskomponent */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} /> {/* Lägg till denna rad */}
          <Route path="/chat" element={<Chat />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
