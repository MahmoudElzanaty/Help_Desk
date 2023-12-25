import React from 'react';
import { Route, Link } from 'react-router-dom';
import WorkflowForm from './WorkflowForm ';

const AgentDashboard = () => {
  return (
    <div>
      <h1>Hello Agent</h1>
      <WorkflowForm/>
    </div>
  );
};

export default AgentDashboard;
