// CreateWorkflowPage.jsx
import React, { useState } from 'react';

const CreateWorkflowPage = () => {
  const [workflowData, setWorkflowData] = useState({
    user: '',
    Category: '',
    Sub_Category: '',
    Workflow_Steps: '',
    Issue_Type: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWorkflowData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreateWorkflow = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/createWorkflow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(workflowData),
        credentials: 'include',
      });

      if (response.ok) {
        setSuccessMessage('Workflow created successfully');
        setErrorMessage('');
      } else {
        const data = await response.json();
        setSuccessMessage('');
        setErrorMessage(`Error creating workflow: ${data.error}`);
      }
    } catch (error) {
      console.error('Error creating workflow:', error.message);
      setSuccessMessage('');
      setErrorMessage('An unexpected error occurred');
    }
  };

  return (
    <div>
      <h1>Create Workflow Page</h1>

      <label>
        User ID:
        <input
          type="text"
          name="user"
          value={workflowData.user}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Category:
        <input
          type="text"
          name="Category"
          value={workflowData.Category}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Sub Category:
        <input
          type="text"
          name="Sub_Category"
          value={workflowData.Sub_Category}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Workflow Steps:
        <textarea
          name="Workflow_Steps"
          value={workflowData.Workflow_Steps}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Issue Type:
        <input
          type="text"
          name="Issue_Type"
          value={workflowData.Issue_Type}
          onChange={handleInputChange}
        />
      </label>

      <button onClick={handleCreateWorkflow}>Create Workflow</button>

      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default CreateWorkflowPage;