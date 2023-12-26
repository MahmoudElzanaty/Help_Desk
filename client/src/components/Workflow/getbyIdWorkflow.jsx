// WorkflowDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const WorkflowDetails = () => {
  const { id } = useParams();
  const [workflow, setWorkflow] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchWorkflowDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/getWorkflowById/${id}`, {
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
        setErrorMessage('');
      } catch (error) {
        console.error('Error fetching workflow:', error);
        setErrorMessage('An unexpected error occurred');
      }
    };

    fetchWorkflowDetails();
  }, [id]);

  return (
    <div className="workflow-details-page">
      <h1>Workflow Details Page</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {workflow && (
        <div className="workflow-info">
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
