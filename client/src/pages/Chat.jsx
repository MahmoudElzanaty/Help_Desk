import React, { useState } from 'react';

function Chat({ messages, socket }) {
  const [messageInput, setMessageInput] = useState('');

  const sendMessage = () => {
    if (messageInput.trim() === '') return;
    const data = {
      name: 'Anonymous',
      message: messageInput,
    };
    socket.emit('message', data);
    setMessageInput('');
  };

  return (
    <div className="chat-container">
      <div className="message-container">
        {messages.map((message) => (
          <div key={message._id}>{message.name}: {message.message}</div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
