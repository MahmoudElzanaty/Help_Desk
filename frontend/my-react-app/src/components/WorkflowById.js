import React, { useState } from 'react';

const WorkflowByIdPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [workflow, setWorkflow] = useState(null);
  const [workflowId, setWorkflowId] = useState('');

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:3000/workflow/getWorkflowById/${workflowId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setWorkflow(data);
    } catch (error) {
      console.error('Error fetching workflow by ID:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Workflow By ID Page</h1>
      <label>
        Enter Workflow ID:
        <input type="text" value={workflowId} onChange={(e) => setWorkflowId(e.target.value)} />
      </label>
      <button onClick={handleSearch}>Search</button>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {workflow && (
        <div>
          <p>Workflow ID: {workflow._id}</p>
          <p>Category: {workflow.Category}</p>
          <p>Sub Category: {workflow.Sub_Category}</p>
          <p>Issue Type: {workflow.Issue_Type}</p>
          <p>Workflow Steps: {workflow.Workflow_Steps}</p>
          
        </div>
      )}
    </div>
  );
};

export default WorkflowByIdPage;
