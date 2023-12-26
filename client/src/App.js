import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import LoginForm from './components/loginComponent'; // Update the path
import RegisterForm from './components/registerComponent';
import HomePage from './components/homeComponent';
import AdminDashboard from './components/Admin';
import UserDashboard from './components/User';
import ManagerDashboard from './components/Manager';
import AgentDashboard from './components/Agent';
import CreateWorkflow from './components/CreateWorkFlowComponent';
import AnalyticsChart from './components/analyticsComponent';
import CreateReportForm from './components/createReportComponent';
import GenerateReportComponent from './components/generateReportComponent';
import ReportsListComponent from './components/getAllReportComponent';
import FAQSearchPage from './components/faqSearchComponent';
import CreateFAQPage from './components/createFAQComponent';
import DeleteFAQPage from './components/deleteFAQ';
import WorkflowList from './components/getAllWorkflow';
import DeleteWorkflow from './components/deleteWorkflow';
import WorkflowDetails from './components/getbyIdWorkflow'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
console.log('Rendering ReportsListComponent');

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

          {/* Actual dashboard components */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/user" element={<UserDashboard />} />
          <Route path="/manager" element={<ManagerDashboard />} />
          <Route path="/agent" element={<AgentDashboard />} />
          <Route path="/CreateWorkflow" element={<CreateWorkflow />} />
          <Route path="/AnalyticsChart" element={<AnalyticsChart />} />
          <Route path="/createReport" element={<CreateReportForm />} />
          <Route path="/generateReport" element={<GenerateReportComponent />} />
          <Route path="/getAllReports" element={<ReportsListComponent />} />
          <Route path="/searchFAQ" element={<FAQSearchPage />} />
          <Route path="/createFAQ" element={<CreateFAQPage />} />
          <Route path="/deleteFAQ" element={<DeleteFAQPage />} />
          <Route path="/getAllWorkflow" element={<WorkflowList />} />
          <Route path="/deleteWorkflow" element={<DeleteWorkflow />} />
          <Route path="/getbyIdWorkflow" element={<WorkflowDetails />} />

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



