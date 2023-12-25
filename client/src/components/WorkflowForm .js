import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const WorkflowForm = () => {
  const [workflowData, setWorkflowData] = useState({
    Category: '',
    Sub_Category: '',
    Workflow_Steps: '',
    Issue_Type: '',
  });

  const [workflowMessage, setWorkflowMessage] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    // Load the user ID from the cookie on component mount
    const storedUserId = Cookies.get('user_id');
    console.log('Stored User ID:', storedUserId);
    setUserId(storedUserId);
  }, []); // The empty dependency array ensures this effect runs once on component mount

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkflowData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleWorkflowCreation = async (e) => {
    e.preventDefault();
    try {
      if (!userId) {
        setWorkflowMessage('User ID not found. Please log in.');
        return;
      }

      const userToken = Cookies.get('token');
      console.log('User Token:', userToken);
      if (!userToken) {
        setWorkflowMessage('User token not found. Please log in.');
        return;
      }

      const response = await fetch('http://localhost:3000/api/v1/Workflow/createWorkflow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          user: userId,
          Category: workflowData.Category,
          Sub_Category: workflowData.Sub_Category,
          Workflow_Steps: workflowData.Workflow_Steps,
          Issue_Type: workflowData.Issue_Type,
        }),
        credentials: 'include', // Ensure this line is present
      });

      if (response.status === 201) {
        const result = await response.json();
        console.log('Workflow created successfully:', result);
        setWorkflowMessage('Workflow created successfully');
      } else {
        console.log('Error creating workflow:', response.status && response.status);
        setWorkflowMessage('Error creating workflow. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setWorkflowMessage('An error occurred during the process of creating a workflow. Please try again.');
    }
  };

  const categoryOptions = ['Hardware', 'Software', 'Network'];
  const subCategoryOptions = {
    Hardware: ['Desktops', 'Laptops', 'Printers', 'Servers', 'Networking equipment'],
    Software: ['Operating system', 'Application software', 'Custom software', 'Integration issues'],
    Network: ['Email issues', 'Internet connection problems', 'Website errors'],
  };

  return (
    <div>
      <h2>Create a New Workflow</h2>
      <form onSubmit={handleWorkflowCreation}>
        <label>
          Category:
          <select
            name="Category"
            value={workflowData.Category}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select a Category</option>
            {categoryOptions.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <br />

        <label>
          Sub Category:
          <select
            name="Sub_Category"
            value={workflowData.Sub_Category}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select a Sub Category</option>
            {workflowData.Category &&
              subCategoryOptions[workflowData.Category].map((subCategory) => (
                <option key={subCategory} value={subCategory}>
                  {subCategory}
                </option>
              ))}
          </select>
        </label>

        <br />

        <label>
          Workflow Steps:
          <textarea
            name="Workflow_Steps"
            value={workflowData.Workflow_Steps}
            onChange={handleChange}
            required
          />
        </label>

        <br />

        <label>
          Issue Type:
          <input
            type="text"
            name="Issue_Type"
            value={workflowData.Issue_Type}
            onChange={handleChange}
            required
          />
        </label>

        <br />

        <button type="submit">Create Workflow</button>
      </form>
      {workflowMessage && <p>{workflowMessage}</p>}
    </div>
  );
};

export default WorkflowForm;
