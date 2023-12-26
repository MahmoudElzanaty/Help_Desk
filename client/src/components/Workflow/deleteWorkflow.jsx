import React, { useState, useEffect } from 'react';
import './DeleteWorkflow.css'; // Import your custom styles


const DeleteWorkflow = () => {
  const [workflowId, setWorkflowId] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/deleteWorkflowById/${workflowId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSuccessMessage('Workflow deleted successfully');
        setErrorMessage('');
      } else {
        setSuccessMessage('');
        setErrorMessage('Error deleting workflow');
      }
    } catch (error) {
      console.error('Error deleting workflow:', error.message);
      setSuccessMessage('');
      setErrorMessage('An unexpected error occurred');
    }
  };

  useEffect(() => {
    // Clear success and error messages after 3 seconds
    const timeout = setTimeout(() => {
      setSuccessMessage('');
      setErrorMessage('');
    }, 3000);

    return () => clearTimeout(timeout); // Cleanup the timeout on component unmount
  }, [successMessage, errorMessage]);

  return (
    <div>
      <h2>Delete Workflow</h2>

      <label>
        Workflow ID:
        <input
          type="text"
          value={workflowId}
          onChange={(e) => setWorkflowId(e.target.value)}
        />
      </label>

      <button onClick={handleDelete}>Delete Workflow</button>

      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default DeleteWorkflow;