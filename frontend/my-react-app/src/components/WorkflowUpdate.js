import React, { useState } from 'react';

const UpdateWorkflowPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [userData, setUserData] = useState({
    user: '',
    Category: '',
    Sub_Category: '',
    Workflow_Steps: '',
    Issue_Type: '',
  });
  const [workflowId, setWorkflowId] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:3000/Workflow/updateWorkflowById/${workflowId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const updatedWorkflow = await response.json();
      setSuccess(true);
      console.log('Updated Workflow:', updatedWorkflow);
    } catch (error) {
      console.error('Error updating workflow:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Update Workflow</h1>
      <label>
        Enter Workflow ID:
        <input type="text" value={workflowId} onChange={(e) => setWorkflowId(e.target.value)} />
      </label>
      <br />
      <label>
        User:
        <input type="text" name="user" value={userData.user} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Category:
        <input type="text" name="Category" value={userData.Category} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Sub Category:
        <input type="text" name="Sub_Category" value={userData.Sub_Category} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Workflow Steps:
        <input type="text" name="Workflow_Steps" value={userData.Workflow_Steps} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Issue Type:
        <input type="text" name="Issue_Type" value={userData.Issue_Type} onChange={handleInputChange} />
      </label>
      <br />
      <button onClick={handleUpdate} disabled={loading}>
        Update Workflow
      </button>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {success && <p>Workflow updated successfully!</p>}
    </div>
  );
};

export default UpdateWorkflowPage;
