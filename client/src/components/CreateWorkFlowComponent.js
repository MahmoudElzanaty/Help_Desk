import React, { useState } from 'react';


const App = () => {
  const [formData, setFormData] = useState({
    user: '',
    Category: '',
    Sub_Category: '',
    Workflow_Steps: '',
    Issue_Type: '',
  });
  const [result, setResult] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const createWorkflow = async () => {
    try {
      const response = await fetch('http://localhost:3000/Workflow/createWorkflow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(`Workflow created successfully. ID: ${data._id}`);
      } else {
        setResult(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error creating workflow:', error);
      setResult('An error occurred while creating the workflow.');
    }
  };

  return (
    <div className="container">
      <h1>Create Workflow</h1>
      <form>
        <label htmlFor="user">User:</label>
        <input type="text" id="user" name="user" value={formData.user} onChange={handleChange} required />

        <label htmlFor="Category">Category:</label>
        <input type="text" id="Category" name="Category" value={formData.Category} onChange={handleChange} required />

        <label htmlFor="Sub_Category">Sub Category:</label>
        <input type="text" id="Sub_Category" name="Sub_Category" value={formData.Sub_Category} onChange={handleChange} required />

        <label htmlFor="Workflow_Steps">Workflow Steps:</label>
        <textarea id="Workflow_Steps" name="Workflow_Steps" value={formData.Workflow_Steps} onChange={handleChange} required></textarea>

        <label htmlFor="Issue_Type">Issue Type:</label>
        <input type="text" id="Issue_Type" name="Issue_Type" value={formData.Issue_Type} onChange={handleChange} required />

        <button type="button" onClick={createWorkflow}>Create Workflow</button>
      </form>

      <div id="result">{result}</div>
    </div>
  );
};

export default App;