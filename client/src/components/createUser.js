import React, { useState } from 'react';

const CreateUser = () => {
  const [user_id, setUserId] = useState('');
  const [Email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Phone_Number, setPhoneNumber] = useState('');
  const [role, setRole] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCreateUser = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/v1/users/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id, Email, password, Phone_Number, role }),
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage('User created successfully');
        setErrorMessage('');
        console.log('User created successfully:', data);
      } else {
        const errorData = await response.json();
        setSuccessMessage('');
        setErrorMessage(`Error creating user: ${errorData.message || 'Unknown error'}`);
        console.error('Error creating user:', errorData);
      }
    } catch (error) {
      console.error('Error creating user:', error.message);
      setSuccessMessage('');
      setErrorMessage('An unexpected error occurred');
    }
  };

  return (
    <div>
      <h2>Create User</h2>
      <form onSubmit={handleCreateUser}>
        <label>
          User ID:
          <input
            type="text"
            value={user_id}
            onChange={(e) => setUserId(e.target.value)}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <label>
          Phone Number:
          <input
            type="text"
            value={Phone_Number}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </label>
        <br />
        <label>
          Role:
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Create User</button>
      </form>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default CreateUser;
