import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registration from '../pages/registrationPage/Registration';

const Routers = () => {
  return (
    <div>
      <Router>
        <Routes>
    
        <Route path="/" element={<Registration />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Routers;