import React, { useState } from 'react';

const CreateFAQPage = () => {
  const [formData, setFormData] = useState({
    tickets: '',
    Question: '',
    Answer: '',
    FAQ_ID: '',
    Category: '',
    Sub_Category: '',
  });
  const [successMessage, setSuccessMessage] = useState('');


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/v1/createFAQ', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // FAQ created successfully, handle the success case
        setSuccessMessage('FAQ created successfully');
      } else {
        // Handle error cases, e.g., display an error message to the user
        console.error('Error creating FAQ:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating FAQ:', error.message);
    }
  };

  return (
    <div>
      <h2>Create FAQ</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Tickets:
          <input
            type="text"
            name="tickets"
            value={formData.tickets}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Question:
          <input
            type="text"
            name="Question"
            value={formData.Question}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Answer:
          <input
            type="text"
            name="Answer"
            value={formData.Answer}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          FAQ ID:
          <input
            type="text"
            name="FAQ_ID"
            value={formData.FAQ_ID}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Category:
          <input
            type="text"
            name="Category"
            value={formData.Category}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Sub-Category:
          <input
            type="text"
            name="Sub_Category"
            value={formData.Sub_Category}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Create FAQ</button>
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      </form>
    </div>
  );
};

export default CreateFAQPage;