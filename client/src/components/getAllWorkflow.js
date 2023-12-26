import React, { useState, useEffect } from 'react';

const WorkflowList = () => {
  const [workflows, setWorkflows] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchWorkflows = async () => {
      try {
        const response = await fetch('http://localhost:3000/Workflow/getAllWorkflows');
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
    <div>
      <h2>Workflow List</h2>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <ul>
        {workflows.map((workflow) => (
          <li key={workflow._id}>
            {/* Render individual workflow details here */}
            <p>{`Workflow ID: ${workflow._id}`}</p>
            <p>{`User: ${workflow.user}`}</p>
            <p>{`Category: ${workflow.Category}`}</p>
            <p>{`Sub-Category: ${workflow.Sub_Category}`}</p>
            <p>{`Workflow Steps: ${workflow.Workflow_Steps}`}</p>
            <p>{`Issue Type: ${workflow.Issue_Type}`}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkflowList;
