import React from 'react';
import ReactDOM from 'react-dom';
import LoginForm from './components/loginComponent';
import RegisterForm from './components/registerComponent';
import TicketForm from './components/createTicketComponent';
import ViewTicket from './components/viewTicketComponent';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/create-ticket" element={<TicketForm />} />
          <Route path="/view-ticket" element={<ViewTicket />} />
        </Routes>
      </div>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
