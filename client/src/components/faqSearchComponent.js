import React, { useState } from 'react';

const FAQSearchPage = () => {
  const [Category, setCategory] = useState('');
  const [Sub_Category, setSubCategory] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const subCategoriesOptions = [
    'Desktops', 'Laptops', 'Printers', 'Servers', 'Networking equipment',
    'Operating system', 'Application software', 'Custom software', 'Integration issues',
    'Email issues', 'Internet connection problems', 'Website errors'
  ];

  const handleSearch = async () => {
    try {
      const response = await fetch('http://localhost:3000/FAQ/search');
      console.log(response);

      const faqs = await response.json();

      if (response.ok) {
        setSearchResults(faqs);
        setErrorMessage('');
      } else if (response.status === 404) {
        setSearchResults([]);
        setErrorMessage('No FAQs found for the specified criteria.');
      } else {
        setSearchResults([]);
        setErrorMessage('An error occurred while fetching FAQs.');
      }
    } catch (error) {
      console.error('Error fetching FAQs:', error.message);
      setSearchResults([]);
      setErrorMessage('An error occurred while fetching FAQs.');
    }
  };

  return (
    <div>
      <h2>FAQ Search</h2>
      <div>
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          value={Category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Hardware">Hardware</option>
          <option value="Software">Software</option>
          <option value="Network">Network</option>
        </select>
      </div>
      <div>
        <label htmlFor="subCategory">Sub-Category:</label>
        <select
          id="subCategory"
          value={Sub_Category}
          onChange={(e) => setSubCategory(e.target.value)}
        >
          <option value="">Select Sub-Category</option>
          {subCategoriesOptions.map((subCat) => (
            <option key={subCat} value={subCat}>
              {subCat}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleSearch}>Search FAQs</button>

      {errorMessage && <p>{errorMessage}</p>}

      {searchResults.length > 0 && (
        <div>
          <h3>Search Results:</h3>
          <ul>
            {searchResults.map((faq) => (
              <li key={faq._id}>{/* Render individual FAQ component here */}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FAQSearchPage;
