import '../App.css';
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const SendEmail = () => {
  const [userEmail, setUserEmail] = useState('');
  const [description, setDescription] = useState('');
  const [emailMessage, setEmailMessage] = useState('');

  const handleSendEmail = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/v1/Notifi/send-email-to-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('token')}`,
        },
        body: JSON.stringify({ userEmail, description }),
        credentials: 'include',
      });

      if (response.status === 200) {
        setEmailMessage('Email sent successfully');
      } else {
        setEmailMessage('Error sending email. Please try again.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setEmailMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h2>Send Email to User</h2>
      <form onSubmit={handleSendEmail}>
        <label>
          User Email:
          <input
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>

        <button type="submit">Send Email</button>
      </form>

      {emailMessage && <p>{emailMessage}</p>}
    </div>
  );
};

export default SendEmail;
