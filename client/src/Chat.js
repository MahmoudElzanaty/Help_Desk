import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io('http://localhost:3000'); // Replace YOUR_SERVER_PORT with the actual port your server is running on


const Chat = ({ senderId, receiverId }) => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    // Listen for incoming chat messages
    socket.on("chat message", (newMessage) => {
      setChatMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      // Clean up the event listener when the component is unmounted
      socket.off("chat message");
    };
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (message.trim() === "") {
      return;
    }

    const newMessage = {
      sender: senderId,
      receiver: receiverId,
      message,
    };

    // Emit the chat message to the server
    socket.emit("chat message", newMessage);

    setChatMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessage("");
  };

  return (
    <div>
      <ul>
        {chatMessages.map((chatMessage, index) => (
          <li key={index}>
            {chatMessage.sender}: {chatMessage.message}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;