// FAQPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './FAQPage.css'; // Import your custom styles

const FAQPage = () => {
  const [faqs, setFAQs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/getAllFAQs', {
          headers: {
            'Accept': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setFAQs(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
        setError(`Error fetching FAQs: ${error.message}`);
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  const handleDeleteFAQ = async (faqId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/deleteFAQ/${faqId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        setFAQs((prevFAQs) => prevFAQs.filter((faq) => faq._id !== faqId));
      } else {
        const errorData = await response.json();
        console.error('Error deleting FAQ:', errorData.message);
      }
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      // Handle network error or other unexpected issues
    }
  };

  return (
    <div className="FAQPage">
      <div className="page-header">
        <h1>All FAQs</h1>
        <div className="buttons-container">
          <Link to="/createFAQPage" className="redirect-button">
            Create FAQ
          </Link>
          <Link to="/FAQSearchPage" className="redirect-button">
            Search FAQ
          </Link>
          {/* Add Link to DeleteFAQPage if needed */}
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {faqs && faqs.length > 0 ? (
        <div className="faqs-table-container">
          <table className="faqs-table">
            <thead>
              <tr>
                <th>FAQ ID</th>
                <th>Description</th>
                <th>Status</th>
                <th>Category</th>
                <th>Sub Category</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {faqs.map((faq) => (
                <tr key={faq._id}>
                  <td>{faq.FAQ_ID}</td>
                  <td>{faq.TDescribtion}</td>
                  <td>{faq.Status}</td>
                  <td>{faq.Category}</td>
                  <td>{faq.Sub_Category}</td>
                  <td>
                    <button onClick={() => handleDeleteFAQ(faq._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No FAQs found.</p>
      )}
    </div>
  );
};

export default FAQPage;