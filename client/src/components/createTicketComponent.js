import '../App.css';
import React, { useState } from 'react';


const TicketForm = () => {
  const [ticketData, setTicketData] = useState({
    category: '',
    subcategory: '',
    description: '',
  });

  const [ticketMessage, setTicketMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicketData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/Tickets/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticketData),
      });

      if (response.ok) {
        setTicketMessage('Ticket created successfully');
      } else {
        setTicketMessage('Choose a category/sub category');
      }
    } catch (error) {
      console.error('Error:', error);
      setTicketMessage('An error occurred during the process of creating a ticket. Please try again.');
    }
  };

  const categoryOptions = ['Hardware', 'Software', 'Network'];
  const subcategoryOptions = {
    Hardware: ['Desktops', 'Laptops', 'Printers', 'Servers', 'Networking equipment'],
    Software: ['Operating system', 'Application software', 'Custom software', 'Integration issues'],
    Network: ['Email issues', 'Internet connection problems', 'Website errors'],
  };

  return (
    <div>
      <h2>Create a New Ticket</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Category:
          <select
            name="category"
            value={ticketData.category}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select a category</option>
            {categoryOptions.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <br />

        <label>
          Subcategory:
          <select
            name="subcategory"
            value={ticketData.subcategory}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select a subcategory</option>
            {ticketData.category &&
              subcategoryOptions[ticketData.category].map((subcategory) => (
                <option key={subcategory} value={subcategory}>
                  {subcategory}
                </option>
              ))}
          </select>
        </label>

        <br />

        <label>
          Description:
          <textarea
            name="description"
            value={ticketData.description}
            onChange={handleChange}
            required
          />
        </label>

        <br />

        <button type="submit">Create Ticket</button>
      </form>
      {ticketMessage && <p>{ticketMessage}</p>}
    </div>
  );
};

export default TicketForm;
