import React from 'react';
import LoginForm from './components/loginComponent';
import RegisterForm from './components/resigesterComponent';

function App() {
  return (
    <div className="App">
      <h1>Login Page</h1>
      <LoginForm />

      <h1>Register Page</h1>
      <RegisterForm />
    </div>
  );
}

export default App;
