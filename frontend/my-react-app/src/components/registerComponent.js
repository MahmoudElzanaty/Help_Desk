import React, { useState } from 'react';

const RegistrationForm = () => {
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
      const response = await fetch('http://localhost:3000/api/v1/users/register', {
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
      } else {
        console.error('Error response:', data); // Log the error response
        setRegistrationStatus(`Registration failed: ${data.message}`);
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

        <br />

        <label>
          Phone Number:
          <input
            type="text"
            name="Phone_Number"
            value={formData.Phone_Number}
            onChange={handleChange}
          />
        </label>

        <br />


        <button type="submit">Register</button>
      </form>

      {registrationStatus && <p>{registrationStatus}</p>}
    </div>
  );
};

export default RegistrationForm;
