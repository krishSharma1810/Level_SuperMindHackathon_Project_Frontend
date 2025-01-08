import React from 'react';
import './navigation.css';
import { Link } from 'react-router-dom';
const Navigation = () => {
  return (
    <div className='navi1'>
      <h3 className='analyti'>Analytixs</h3>
      <div className='nav-buttons'>
        <Link to="/" className="nav-btn">Dashboard</Link>
        <Link to="/detailed-analysis" className="nav-btn">Detailed Analysis</Link>
        <Link to="/chatbot" className="nav-btn">Chatbot</Link>
      </div>
    </div>
  );
};

export default Navigation;
