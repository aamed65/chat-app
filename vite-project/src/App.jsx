
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login'; 
import Chat from './components/Chat';
import SideNav from './components/SideNav';
import './App.css';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <div className="App">
      
        <SideNav /> {}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} /> {}
          <Route path="/chat" element={<Chat />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
