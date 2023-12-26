// WorkflowList.js
import React, { useState, useEffect } from 'react';
import './WorkflowList.css'; // Import your custom styles

const WorkflowListUser = () => {
  const [workflows, setWorkflows] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchWorkflows = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/getAllWorkflows');
        const data = await response.json();

        if (response.ok) {
          setWorkflows(data);
          setErrorMessage('');
        } else {
          setErrorMessage('Error fetching workflows');
        }
      } catch (error) {
        console.error('Error fetching workflows:', error.message);
        setErrorMessage('An unexpected error occurred');
      }
    };

    fetchWorkflows();
  }, []); // Empty dependency array ensures useEffect runs once after initial render

  return (
    <div className="WorkflowList">
      <div className="page-header">
        <h2>Workflow List</h2>
        <div className="buttons-container">

        
        </div>
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {workflows && workflows.length > 0 ? (
        <div className="workflow-list-container">
          <table className="workflow-list">
            <thead>
              <tr>
                <th>Workflow ID</th>
                <th>User</th>
                <th>Category</th>
                <th>Sub-Category</th>
                <th>Issue Type</th>
                <th>Workflow Steps</th>
              </tr>
            </thead>
            <tbody>
              {workflows.map((workflow) => (
                <tr key={workflow._id}>
                  <td>{workflow._id}</td>
                  <td>{workflow.user}</td>
                  <td>{workflow.Category}</td>
                  <td>{workflow.Sub_Category}</td>
                  <td>{workflow.Issue_Type}</td>
                  <td>{workflow.Workflow_Steps}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No workflows found.</p>
      )}
    </div>
  );
};

export default WorkflowListUser;
