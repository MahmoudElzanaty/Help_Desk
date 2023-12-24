// Import necessary modules
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import LoginForm from './components/loginComponent';
import RegisterForm from './components/registerComponent';
import HomePage from './components/homeComponent';
import AdminDashboard from './components/AdminDashboard';
import CustomerDashboard from './components/CustomerDashboard';
import ManagerDashboard from './components/ManagerDashboard';
import AgentDashboard from './components/AgentDashboard';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  // State to store the user role
  const [userRole, setUserRole] = useState(null);

  // Check if the user role is already stored in localStorage during the initial render
  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');

    if (storedRole) {
      setUserRole(storedRole);
    }
  }, []);

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
          <Route path="/login" element={<LoginForm setUserRole={setUserRole} />} />
          <Route path="/register" element={<RegisterForm/>} />

          {/* Actual dashboard components */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          <Route path="/manager-dashboard" element={<ManagerDashboard />} />
          <Route path="/agent-dashboard" element={<AgentDashboard />} />

          {/* Role-based redirects */}
          {userRole === 'admin' && (
            <Route
              path="/dashboard"
              element={<Navigate to="/admin-dashboard" replace />}
            />
          )}
          {userRole === 'customer' && (
            <Route
              path="/dashboard"
              element={<Navigate to="/customer-dashboard" replace />}
            />
          )}
          {userRole === 'manager' && (
            <Route
              path="/dashboard"
              element={<Navigate to="/manager-dashboard" replace />}
            />
          )}
          {userRole === 'agent' && (
            <Route
              path="/dashboard"
              element={<Navigate to="/agent-dashboard" replace />}
            />
          )}

          {/* Redirect to login if the user is not authenticated */}
          <Route
            path="/dashboard"
            element={<Navigate to="/login" replace />}
          />
        </Routes>
      </div>
    </Router>
  );
}

// Render the App component
ReactDOM.render(<App />, document.getElementById('root'));

// Export the App component
export default App;
