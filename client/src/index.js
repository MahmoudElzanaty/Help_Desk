// index.js

import React from 'react';
import ReactDOM from 'react-dom';
import LoginForm from './components/loginComponent';

const App = () => {
  return (
    <div>
      <h1>Help_Desk</h1>
      <LoginForm />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
