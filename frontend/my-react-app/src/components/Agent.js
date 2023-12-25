
//write hello customer

import React from 'react';
import { Link } from 'react-router-dom'; // Add this line


const Agent = () => {
    return (
        <div>
        <h1>Hello Agent</h1>
        <div>
        {/* Button to View Tickets */}
        <Link to="/ticket-byId">
          <button>View Tickets</button>
        </Link>
      </div>
        </div>
    );
    }


    export default Agent;