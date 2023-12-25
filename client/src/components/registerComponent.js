// Import necessary modules
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './registerComponent.css'; // Import your CSS file for specific styling

const RegistrationForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Email: '',
    password: '',
    Phone_Number: '',
    role: 'user',
  });

  const [registrationStatus, setRegistrationStatus] = useState(null);

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
      const response = await fetch('http://localhost:3000/api/v1/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        setRegistrationStatus('Registration successful');

        // Use setTimeout inside a useEffect to handle component unmounting
        const timer = setTimeout(() => {
          // Redirect to the login page after 1 second
          navigate('/login');
        }, 1000);

        // Clear the timer if the component unmounts before the delay
        return () => clearTimeout(timer);
      } else {
        console.error('Error response:', data);
        setRegistrationStatus(`Registration failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setRegistrationStatus('Server error');
    }
  };

  return (
    <div className="registration-form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="registration-form">
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

        <label>
          Phone Number:
          <input
            type="text"
            name="Phone_Number"
            value={formData.Phone_Number}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Register</button>
      </form>

      {registrationStatus && <p className="registration-status">{registrationStatus}</p>}
    </div>
  );
};

export default RegistrationForm;
