import '../App.css';
import React, { useState } from 'react';

const LoginForm = () => {
  console.log('LoginForm rendering...');

  const [formData, setFormData] = useState({
    Email: '',
    password: '',
  });


  const [userRole, setUserRole] = useState(null);

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
        const role = responseData.user.role; // Update this line based on the actual response structure
        localStorage.setItem('loginMessage', JSON.stringify(responseData));
        setLoginMessage(`Login successful. User role: ${role}`);
        setUserRole(role);
      } else {
        setLoginMessage('Login failed. Please check your email and password.');
      }
    } catch (error) {
      console.error('Error:', error);
      setLoginMessage('An error occurred during login.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
          />
        </label>

        <br />

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

      {loginMessage && <p>{loginMessage}</p>}
    </div>
  );
};

export default LoginForm;
