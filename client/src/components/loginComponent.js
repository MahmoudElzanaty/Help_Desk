// Import necessary modules
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import './loginComponent.css'; // Import your CSS file for specific styling

const LoginForm = ({ handleLogin }) => {
  const [formData, setFormData] = useState({
    Email: '',
    password: '',
  });

  const [loginMessage, setLoginMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      if (response.ok) {
        const responseData = await response.json();
        const role = responseData.user.role;

        // Store user_id in a cookie
        Cookies.set('user_id', responseData.user.user_id, {
          expires: 3 / 1440, // Expires in 3 minutes (assuming this is what you intended)
          sameSite: 'none',
          secure: true,
        });

        localStorage.setItem('loginMessage', JSON.stringify(responseData));
        setLoginMessage(`Login successful. User role: ${role}`);
        handleLogin(role);
      } else {
        setLoginMessage('Login failed. Please check your email and password.');
      }
    } catch (error) {
      console.error('Error:', error);
      setLoginMessage('An error occurred during login.');
    }
  };

  return (
    <div className="login-form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <label>
          Email:
          <input
            type="email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Login</button>
      </form>

      {loginMessage && <p className="login-message">{loginMessage}</p>}
    </div>
  );
};

export default LoginForm;
