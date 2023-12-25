// App.js
import React from 'react';
import { Link } from 'react-router-dom'; // Add this line
const User = () => {

  return (
    <div>
      <h1>Your MERN Stack App</h1>
      <div>
        {/* Button to Create Ticket */}
        <Link to="/create-ticket">
          <button>Create Ticket</button>
        </Link>
      </div>
    </div>
  );
};

export default User;