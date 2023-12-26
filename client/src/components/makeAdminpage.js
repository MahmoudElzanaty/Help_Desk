import React, { useState } from 'react';

const UpdateUserRole = () => {
  const [userId, setUserId] = useState('');
  const [newRole, setNewRole] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUpdateRole = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/v1/updateRole/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: newRole }),
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage('User role updated successfully');
        setErrorMessage('');
        console.log('User role updated successfully:', data);
      // ...

    } else {
      const errorData = await response.json();
      setSuccessMessage('');
      setErrorMessage(`Error updating user role: ${errorData.message || 'Unknown error'}`);
      console.error('Error updating user role:', errorData);
    }
    
    // ...
    
    } catch (error) {
      console.error('Error updating user role:', error.message);
      setSuccessMessage('');
      setErrorMessage('An unexpected error occurred');
    }
  };

  return (
    <div>
      <h2>Update User Role</h2>
      <form onSubmit={handleUpdateRole}>
        <label>
          User ID:
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </label>
        <br />
        <label>
          New Role:
          <input
            type="text"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Update Role</button>
      </form>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default UpdateUserRole;
