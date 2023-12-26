import React, { useState } from 'react';

const DeleteFAQPage = () => {
  const [faqId, setFaqId] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/FAQ/deleteFAQ/${faqId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // FAQ deleted successfully, handle the success case
        setSuccessMessage('FAQ deleted successfully');
        setErrorMessage(''); // Clear any previous error message
      } else if (response.status === 404) {
        // FAQ not found
        setErrorMessage('FAQ not found');
        setSuccessMessage(''); // Clear any previous success message
      } else {
        // Handle other error cases
        console.error('Error deleting FAQ:', response.statusText);
        setErrorMessage(`Error deleting FAQ: ${response.statusText}`);
        setSuccessMessage(''); // Clear any previous success message
      }
    } catch (error) {
      console.error('Error deleting FAQ:', error.message);
      setErrorMessage('An unexpected error occurred');
      setSuccessMessage(''); // Clear any previous success message
    }
  };

  return (
    <div>
      <h2>Delete FAQ</h2>
      <div>
        <label htmlFor="faqId">FAQ ID:</label>
        <input
          type="text"
          id="faqId"
          value={faqId}
          onChange={(e) => setFaqId(e.target.value)}
        />
      </div>
      <button onClick={handleDelete}>Delete FAQ</button>

      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default DeleteFAQPage;
