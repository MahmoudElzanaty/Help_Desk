import React from 'react';
import LoginForm from './components/loginComponent';
import RegisterForm from './components/registerComponent';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </div>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));


export default App;
