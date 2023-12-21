import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import moment from 'moment';
import './app.css';

const socket = socketIOClient('http://localhost:3000'); // Change the port if needed

function App() {
  const [clientsTotal, setClientsTotal] = useState(0);
  const [messages, setMessages] = useState([]);
  const [nameInput, setNameInput] = useState('anonymous');
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    socket.on('clients-total', (data) => {
      setClientsTotal(data);
    });

    // Listen for 'incoming-message' event (aligned with the backend)
    socket.on('incoming-message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on('feedback', (data) => {
      setMessages((prevMessages) => [...prevMessages, { feedback: data.feedback }]);
    });

    return () => {
      socket.off('clients-total');
      socket.off('incoming-message');
      socket.off('feedback');
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (messageInput === '') return;

    const data = {
      name: nameInput,
      message: messageInput,
      dateTime: new Date(),
    };

    // Emit 'outgoing-message' event (aligned with the backend)
    socket.emit('outgoing-message', data);
    addMessageToUI(true, data);
    setMessageInput('');
  };

  const addMessageToUI = (isOwnMessage, data) => {
    const message = {
      isOwnMessage,
      content: data.message,
      name: data.name,
      dateTime: data.dateTime,
    };

    setMessages((prevMessages) => [...prevMessages, message]);
    scrollToBottom();
  };

  const scrollToBottom = () => {
    const messageContainer = document.getElementById('message-container');
    messageContainer.scrollTop = messageContainer.scrollHeight;
  };

  return (
    <div className="main">
      <h1 className="title">Live Chat</h1>
      <div className="name">
        <span><i className="far fa-user"></i></span>
        <input
          type="text"
          id="name-input"
          className="name-input"
          value={nameInput}
          maxLength="20"
          onChange={(e) => setNameInput(e.target.value)}
        />
      </div>

      <ul className="message-container" id="message-container">
        {messages.map((message, index) => (
          <li
            key={index}
            className={`message ${message.isOwnMessage ? 'message-right' : 'message-left'}`}
          >
            <p className="message">
              {message.content}
              <span>{message.name} ● {moment(message.dateTime).format('DD MMM HH:mm')}</span>
            </p>
          </li>
        ))}
      </ul>

      <form className="message-form" id="message-form" onSubmit={sendMessage}>
        <input
          type="text"
          name="message"
          id="message-input"
          className="message-input"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <div className="v-divider"></div>
        <button type="submit" className="send-button">
          send <span><i className="fas fa-paper-plane"></i></span>
        </button>
      </form>

      <h3 className="clients-total" id="client-total">Total clients: {clientsTotal}</h3>
    </div>
  );
}

export default App;
