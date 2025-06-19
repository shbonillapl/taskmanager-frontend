import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './pages/Auth';
import Home from './pages/Home';

const App = () => {
  const isAuth = !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuth ? <Home /> : <Navigate to="/auth" />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  );
};

export default App;
