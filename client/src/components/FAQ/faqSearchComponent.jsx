// TicketByUserId.js
import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

const FAQComponent = () => {
  const [Category, setCategory] = useState('');
  const [Sub_Category, setSub_Category] = useState('');
  const [FAQ, setFAQ] = useState([]);
  // const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/searchFAQ?Category=${Category}&Sub_Category=${Sub_Category}`, {
        headers: {
          'Accept': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setFAQ(data);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    }
  };

  return (
    <div>
      <h1>Get FAQ</h1>
      <label>
        Enter Category:
        <input type="text" value={Category} onChange={(e) => setCategory(e.target.value)} />
      </label>
      <label>
        Enter Sub Category:
        <input type="text" value={Sub_Category} onChange={(e) => setSub_Category(e.target.value)} />
      </label>
      <button onClick={handleSearch}>Search</button>

      {FAQ.length > 0 ? (
        <ul>
          {FAQ.map((faq) => (
            <li key={faq._id}>
              <p>Ticket: {faq.tickets}</p>
              <p>FAQ ID: {faq.FAQ_ID}</p>
              <p>Category: {faq.Category}</p>
              <p>Sub Category: {faq.Sub_Category}</p>
              <p>Description: {faq.TDescribtion}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No FAQs found.</p>
      )}
      {/* <button onClick={() => navigate('/view-ticket')}>All Tickets</button> */}
    </div>
  );
};

export default FAQComponent;