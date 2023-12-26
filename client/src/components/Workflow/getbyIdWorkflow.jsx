import React, { useState, useEffect } from 'react';

const WorkflowDetails = ({ match }) => {
  const [workflow, setWorkflow] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchWorkflowDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/getWorkflowById/${match.params.id}`);
        if (response.ok) {
          const data = await response.json();
          setWorkflow(data);
          setErrorMessage('');
        } else {
          setErrorMessage('Error fetching workflow');
        }
      } catch (error) {
        console.error('Error fetching workflow:', error.message);
        setErrorMessage('An unexpected error occurred');
      }
    };

    fetchWorkflowDetails();
  }, [match.params.id]);

  return (
    <div>
      <h1>Workflow Details Page</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {workflow && (
        <div>
          <p>{`Workflow ID: ${workflow._id}`}</p>
          <p>{`User ID: ${workflow.user}`}</p>
          <p>{`Category: ${workflow.Category}`}</p>
          <p>{`Sub Category: ${workflow.Sub_Category}`}</p>
          {/* Add more details as needed */}
        </div>
      )}
    </div>
  );
};

export default WorkflowDetails;