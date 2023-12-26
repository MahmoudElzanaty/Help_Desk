import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import LoginForm from './components/loginComponent'; // Update the path
import RegisterForm from './components/registerComponent';
import HomePage from './components/homeComponent';
import AdminDashboard from './components/Dashboards/Admin';
import UserDashboard from './components/Dashboards/User';
import ManagerDashboard from './components/Dashboards/Manager';
import AgentDashboard from './components/Dashboards/Agent';
import CreateTicketPage from './components/Tickets/createTicket'; // Adjust the import path
import ViewTicketById from './components/Tickets/TicketByUserId';
import ViewTicket from './components/Tickets/TicketList';
import Reports from './components/Reports/reportComponent';
import ReportsById from './components/Reports/reportByIdComponent';
import ReportsPage from './components/Reports/ReportsPage';
import AnalyticsView from './components/aanalyticsComponent';
import WorkflowList from './components/Workflow/getAllWorkflow';
import DeleteWorkflow from './components/Workflow/deleteWorkflow';
import WorkflowById from './components/Workflow/getbyIdWorkflow';
import CreateWorkflow from './components/Workflow/createWorkflow';
import WorkflowUpdate from './components/Workflow/WorkflowUpdate';
import FAQSearchPage from './components/FAQ/faqSearchComponent';
//import FAQSearch from './components/FAQ/FAQComponent';
import CreateFAQPage from './components/FAQ/createFAQComponent';
import DeleteFAQPage from './components/FAQ/deleteFAQ';
import FAQPage from './components/FAQ/FAQPage';
import FAQPageUser from './components/FAQ/FAQUser';
import WorkflowListUser from './components/Workflow/WorkflowUser';
import ReportsPageAgent from './components/Reports/ReportsPageAgent';
import AgentTicketsPage from './components/Tickets/TicketListAgent';
import UpdateUserForm from './components/User/UpdateUser';
import UpdateUserRole from './components/User/makeAdminpage';
import CreateUser from './components/User/createUser'






import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UpdateTicketPage from './components/Tickets/updateTicket';

function App() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');

    if (storedRole) {
      setUserRole(storedRole);
    }
  }, []);

  const handleLogin = (role) => {
    setUserRole(role);
    localStorage.setItem('userRole', role);
    window.location.replace(`/${role.toLowerCase()}`);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                userRole={userRole}
                setUserRole={setUserRole}
              />
            }
          />
          <Route
            path="/login"
            element={<LoginForm handleLogin={handleLogin} />}
          />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/create-ticket" element={<CreateTicketPage />} />
          <Route path="/updateTicket" element={<UpdateTicketPage/>}/>
          <Route path='/view-ticket' element={<ViewTicket />} />
          <Route path='/ticket-byId' element={<ViewTicketById />} />
          <Route path='/createReport' element={<Reports/>} />
          <Route path='/analytics' element={<AnalyticsView />} />
          <Route path='/report-byId' element={<ReportsById />} />
          <Route path='/FAQPage' element={< FAQPage />} />
          <Route path='/ReportsPage' element={< ReportsPage />} />
          <Route path='/createFAQPage' element={<CreateFAQPage />} />
          <Route path='/deleteFAQ' element={<DeleteFAQPage />} />
          <Route path='/workflowList' element={<WorkflowList />} />
          <Route path='/deleteWorkflow' element={<DeleteWorkflow />} />
          <Route path='/workflowById' element={<WorkflowById />} />
          <Route path='/FAQSearchPage' element={<FAQSearchPage />} />
          <Route path='/WorkflowUpdate' element={<WorkflowUpdate />} />
          <Route path='/CreateWorkflow' element={<CreateWorkflow />} />
          <Route path='/FAQPageUser' element={<FAQPageUser />} />
          <Route path='/WorkflowUser' element={<WorkflowListUser />} />
          <Route path='/ReportsPageAgent' element={<ReportsPageAgent />} />
          <Route path='/AgentTicketsPage' element={<AgentTicketsPage />} />
          <Route path='/UpdateUser' element={<UpdateUserForm />} />
          <Route path='/makeAdmin' element={< UpdateUserRole/>} />
          <Route path='/createUser' element={< CreateUser/>} />

          




          {/* Actual dashboard components */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/user" element={<UserDashboard />} />
          <Route path="/manager" element={<ManagerDashboard />} />
          <Route path="/agent" element={<AgentDashboard />} />

          {/* Redirect to login if the user is not authenticated */}
          <Route
            path=""
            element={<Navigate to="/login" replace />}
          />
        </Routes>
      </div>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
