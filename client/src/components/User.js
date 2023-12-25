// App.js
import React from 'react';
import TicketForm from './TicketForm';
import SendEmail from './SendEmail';
import ReportsList from './ReportsList';
import WorkflowForm from './WorkflowForm ';

const User = () => {

  return (
    <div>
      <h1>Your MERN Stack App</h1>
      <TicketForm/>
    </div>
  );
};

export default User;
