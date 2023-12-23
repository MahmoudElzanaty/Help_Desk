import '../App.css';
import React, { useState } from 'react';


const TicketForm = () => {
  const [ticketData, setTicketData] = useState({
    Category: '',
    Sub_Category: '',
    TDescription: '',
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
      const response = await fetch('http://localhost:3000/Tickets/createTicket', {
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
            name="Category"
            value={ticketData.Category}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select a category</option>
            {categoryOptions.map((Category) => (
              <option key={Category} value={Category}>
                {Category}
              </option>
            ))}
          </select>
        </label>

        <br />

        <label>
          Subcategory:
          <select
            name="Sub_Category"
            value={ticketData.Sub_Category}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select a subcategory</option>
            {ticketData.Category &&
              subcategoryOptions[ticketData.Category].map((Sub_Category) => (
                <option key={Sub_Category} value={Sub_Category}>
                  {Sub_Category}
                </option>
              ))}
          </select>
        </label>

        <br />

        <label>
          Description:
          <textarea
            name="TDescribtion"
            value={ticketData.TDescribtion}
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
