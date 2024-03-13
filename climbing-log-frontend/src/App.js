// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import AdminPanel from './pages/AdminPanel';
import ClimbingGymMap from './components/ClimbingGymMap'; // Update the import path if needed
import Home from './components/Home';
import NotFound from './components/NotFound';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/climbing-gym-map" element={<ClimbingGymMap />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
