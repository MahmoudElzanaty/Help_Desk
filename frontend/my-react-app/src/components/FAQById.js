import React, { useState } from 'react';

const FAQByIdPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [faq, setFaq] = useState(null);
  const [faqId, setFaqId] = useState('');

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:3000/FAQ/GetById/${faqId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setFaq(data);
    } catch (error) {
      console.error('Error fetching FAQ by ID:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>FAQ By ID</h1>
      <label>
        Enter FAQ ID:
        <input type="text" value={faqId} onChange={(e) => setFaqId(e.target.value)} />
      </label>
      <button onClick={handleSearch}>Search</button>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {faq && (
        <div>
          <p>Question: {faq.Question}</p>
          <p>Answer: {faq.Answer}</p>
          <p>Category: {faq.Category}</p>
          <p>Sub Category: {faq.Sub_Category}</p>
        </div>
      )}
    </div>
  );
};

export default FAQByIdPage;
