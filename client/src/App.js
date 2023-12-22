import React from "react";
import Chat from "./Chat";

const App = () => {
  // Set the sender and receiver IDs based on your logic
  const senderId = "senderId";
  const receiverId = "receiverId";

  return (
    <div>
      <h1>One-to-One Live Chat</h1>
      <Chat senderId={senderId} receiverId={receiverId} />
    </div>
  );
};

export default App;