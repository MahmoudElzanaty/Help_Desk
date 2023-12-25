import React, { useState } from 'react';
import './CreateTicketPage.css';
import { useNavigate } from 'react-router-dom';

const CreateTicketPage = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user: '',
    Category: '',
    Sub_Category: '',
    TDescribtion: '',
  });

  const [responseMessage, setResponseMessage] = useState('');

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
      const response = await fetch('http://localhost:3000/api/v1/createTicket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      if (response.ok) {
        const responseData = await response.json();
        setResponseMessage(`Ticket created successfully. Ticket ID: ${responseData._id}`);
        const timer = setTimeout(() => {
            // Redirect to the login page after 1 second
            navigate('/User');
          }, 1000);

          return () => clearTimeout(timer);
      } else {
        const errorData = await response.json();
        setResponseMessage(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('An error occurred during ticket creation.');
    }
  };

  return (
    <div className="create-ticket-container">
      <h2>Create Ticket</h2>
      <form onSubmit={handleSubmit} className="ticket-form">
        <div className="form-group">
          <label>User:</label>
          <input type="text" name="user" value={formData.user} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Category:</label>
          <select name="Category" value={formData.Category} onChange={handleChange}>
            <option value="">Select Category</option>
            <option value="Hardware">Hardware</option>
            <option value="Software">Software</option>
            <option value="Network">Network</option>
          </select>
        </div>

        <div className="form-group">
          <label>Sub-Category:</label>
          <select name="Sub_Category" value={formData.Sub_Category} onChange={handleChange}>
            <option value="">Select Sub-Category</option>
            {formData.Category === 'Hardware' && (
              <>
                <option value="Desktops">Desktops</option>
                <option value="Laptops">Laptops</option>
                <option value="Printers">Printers</option>
                <option value="Servers">Servers</option>
                <option value="Networking equipment">Networking equipment</option>
              </>
            )}
            {formData.Category === 'Software' && (
              <>
                <option value="Operating system">Operating system</option>
                <option value="Application software">Application software</option>
                <option value="Custom software">Custom software</option>
                <option value="Integration issues">Integration issues</option>
              </>
            )}
            {formData.Category === 'Network' && (
              <>
                <option value="Email issues">Email issues</option>
                <option value="Internet connection problems">Internet connection problems</option>
                <option value="Website errors">Website errors</option>
              </>
            )}
          </select>
        </div>

        <div className="form-group">
          <label>Ticket Description:</label>
          <textarea name="TDescribtion" value={formData.TDescribtion} onChange={handleChange} />
        </div>

        <button type="submit">Submit</button>
      </form>

      {responseMessage && <p className="response-message">{responseMessage}</p>}
    </div>
  );
};

export default CreateTicketPage;
