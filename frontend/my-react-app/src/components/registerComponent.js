import '../App.css';
import React, { useState } from 'react';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phoneNumber: '',
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
      const response = await fetch('http://localhost:3000/Users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setRegistrationStatus('Registration successful');
      } else {
        setRegistrationStatus('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setRegistrationStatus('Server error');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
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

        <br />

        <label>
          Phone Number:
          <input
            type="number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Register</button>
      </form>

      {registrationStatus && <p>{registrationStatus}</p>}
    </div>
  );
};

export default RegistrationForm;