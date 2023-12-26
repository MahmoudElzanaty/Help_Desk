import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import './User.css';

const UserDashboard = () => {
  const [qrImage, setQrImage] = useState(null);
  const [codeRequested, setCodeRequested] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = Cookies.get('userId');
    console.log('Stored User ID:', storedUserId);
    setUserId(storedUserId);
  }, []);

  const enable2FA = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/generateMFACode?id=${userId}`);
      const { image, success, codeRequested } = await response.json();

      if (success) {
        setQrImage(image);
        setCodeRequested(codeRequested);
      } else {
        alert('Unable to fetch the QR image');
      }
    } catch (error) {
      console.error('Error enabling 2FA:', error);
      alert('Error enabling 2FA');
    }
  };

  const update2FA = async (code) => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/setMFA?code=${code}&id=${userId}`);
      const { success } = await response.json();
      if (success) {
        alert('SUCCESS: 2FA enabled/updated');
      } else {
        alert('ERROR: Unable to update/enable 2FA');
      }
    } catch (error) {
      console.error('Error updating 2FA:', error);
      alert('Error updating 2FA');
    }
  };

  const handleUpdateFormSubmit = (e) => {
    e.preventDefault();
    const code = e.target.code.value;
    update2FA(code);
    e.target.reset();
  };

  return (
    <div className="user-dashboard">
      <nav className="navbar">
        <Link to="/dashboard" className="nav-link">
          Dashboard
        </Link>
        <Link to="/ReportsPage" className="nav-link">
          Reports
        </Link>
        <Link to="/FAQPage" className="nav-link">
          FAQ
        </Link>
      </nav>

      <div className="content">
        <h2>Welcome to Your Dashboard</h2>
        {/* Other content in the user dashboard */}
      </div>

      <Link to="/create-ticket">
        <button className="create-ticket-button">Create Ticket</button>
      </Link>

      <button id="enable2FAButton" onClick={enable2FA}>
        Enable 2FA
      </button>

      {qrImage && <img src={qrImage} alt="QR Code" id="qrImage" />}

      {codeRequested && (
        <form id="twoFAUpdateForm" onSubmit={handleUpdateFormSubmit}>
          <label htmlFor="code">Enter 2FA Code:</label>
          <input type="text" id="code" name="code" required />
          <button type="submit">Update 2FA</button>
        </form>
      )}
    </div>
  );
};

export default UserDashboard;
