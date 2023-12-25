  import '../App.css';
  import React, { useState, useEffect } from 'react';
  import Cookies from 'js-cookie';

  const TicketForm = () => {
    const [ticketData, setTicketData] = useState({
      Category: '',
      Sub_Category: '',
      TDescribtion: '',
    });

    const [ticketMessage, setTicketMessage] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
      // Load the user ID from the cookie on component mount
      const storedUserId = Cookies.get('user_id');
      console.log('Stored User ID:', storedUserId);
      setUserId(storedUserId);
    }, []); // The empty dependency array ensures this effect runs once on component mount

    const handleChange = (e) => {
      const { name, value } = e.target;
      setTicketData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
    const handleTicketCreation = async (e) => {
      e.preventDefault();
      try {
        if (!userId) {
          setTicketMessage('User ID not found. Please log in.');
          return;
        }
    
        const userToken = Cookies.get('token');
        console.log('User Token:', userToken);
        if (!userToken) {
          setTicketMessage('User token not found. Please log in.');
          return;
        }
    
        const response = await fetch('http://localhost:3000/api/v1/Tickets/createTicket',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`,
          },
          body: JSON.stringify({
            agent: "65885fe2013e494ebbfd9d8d",
            Category: ticketData.Category,
            Sub_Category: ticketData.Sub_Category,
            Priority: 'Medium',
            Status: 'open',
            TDescribtion: ticketData.TDescribtion,
            userRate: 3,
          }),
          credentials: 'include', // Ensure this line is present
        });
        if (response.status === 201) {
          const result = await response.json();
          console.log('Ticket created successfully:', result);
          setTicketMessage('Ticket created successfully');
          
////////////////////////////////////////////////////////////////Notifications///////////////////////////////// 
// Call the notification endpoint after creating the ticket
await fetch('http://localhost:3000/api/v1/Notifi/submit-ticket', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${userToken}`,
  },
  body: JSON.stringify({
    // Your request payload here
  }),
  credentials: 'include', // Ensure this line is present
});



        } else {
          console.log('Error creating ticket:', response.status && response.status);
          setTicketMessage('Error creating ticket. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
        setTicketMessage('An error occurred during the process of creating a ticket. Please try again.');
      }
    };

    
    
    const categoryOptions = ['Hardware', 'Software', 'Network'];
    const Sub_CategoryOptions = {
      Hardware: ['Desktops', 'Laptops', 'Printers', 'Servers', 'Networking equipment'],
      Software: ['Operating system', 'Application software', 'Custom software', 'Integration issues'],
      Network: ['Email issues', 'Internet connection problems', 'Website errors'],
    };

    return (
      <div>
        <h2>Create a New Ticket</h2>
        <form onSubmit={handleTicketCreation}>
          <label>
            Category:
            <select
              name="Category"
              value={ticketData.Category}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select a Category</option>
              {categoryOptions.map((Category) => (
                <option key={Category} value={Category}>
                  {Category}
                </option>
              ))}
            </select>
          </label>

          <br />

          <label>
            Sub Category:
            <select
              name="Sub_Category"
              value={ticketData.Sub_Category}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select a Sub Category</option>
              {ticketData.Category &&
                Sub_CategoryOptions[ticketData.Category].map((Sub_Category) => (
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