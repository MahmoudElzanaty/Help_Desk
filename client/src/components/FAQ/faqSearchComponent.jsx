// FAQComponent.js
import React, { useState } from 'react';
import './FAQComponent.css';

const FAQComponent = () => {
  const [Category, setCategory] = useState('');
  const [Sub_Category, setSub_Category] = useState('');
  const [FAQ, setFAQ] = useState([]);

  const categories = ['Software', 'Hardware', 'Network'];
  const subCategories = {
    Software: ['Integration issues', 'Operating system', 'Application software', 'Custom Software', 'Network issues'],
    Hardware: ['Desktops', 'Laptops', 'Printers', 'Servers', 'Networking equipment'],
    Network: ['Email issues', 'Internet connection problems', 'Website errors'],
  };

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
    <div className='Bar'>
      <h1>Get FAQ</h1>

      <div className="dropdown-container">
        <label>
          Select Category:
          <select value={Category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>

        <label>
          Select Sub Category:
          <select value={Sub_Category} onChange={(e) => setSub_Category(e.target.value)}>
            <option value="">Select Sub Category</option>
            {Category && subCategories[Category].map((subCat) => (
              <option key={subCat} value={subCat}>
                {subCat}
              </option>
            ))}
          </select>
        </label>
      </div>

      <button onClick={handleSearch}>Search</button>

      {FAQ.length > 0 ? (
        <ul>
          {FAQ.map((faq) => (
            <li key={faq._id}>
              <p>Ticket: {faq.tickets}</p>
              <p>FAQ ID: {faq.FAQ_ID}</p>
              <p>Category: {faq.Category}</p>
              <p>Sub Category: {faq.Sub_Category}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No FAQs found.</p>
      )}
    </div>
  );
};

export default FAQComponent;
