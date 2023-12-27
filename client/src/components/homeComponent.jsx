import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Create a separate CSS file for styling

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Welcome to Help Me</h1>
      <div className="button-container">
        <Link to="/login">
          <button className="login-button">Login</button>
        </Link>
        <Link to="/register">
          <button className="register-button">Register</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
