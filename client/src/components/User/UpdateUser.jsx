import React, { useState } from 'react';

const UpdateUserForm = () => {
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleUpdateUser = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/updateUser/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Email: email, Phone_Number: phoneNumber }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'An error occurred');
      }

      setSuccessMessage('User updated successfully: ');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="update-user-container">
      <h1 className="form-title">Update User</h1>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <div className="form-group">
        <label htmlFor="userId">User ID:</label>
        <input
          type="text"
          id="userId"
          className="form-input"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">New Email:</label>
        <input
          type="text"
          id="email"
          className="form-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="phoneNumber">New Phone Number:</label>
        <input
          type="text"
          id="phoneNumber"
          className="form-input"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <button className="update-button" onClick={handleUpdateUser}>
        Update User
      </button>
    </div>
  );
};

export default UpdateUserForm;
