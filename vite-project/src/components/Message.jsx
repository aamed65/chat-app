// Message.jsx
import React from 'react';

const Message = ({ message, isCurrentUser }) => {
  return (
    <div className={`message ${isCurrentUser ? 'current-user' : ''}`}>
      <img src={message.avatar} alt={message.username} className="avatar" />
      <div className="message-content">
        <strong>{message.username}</strong>
        <p>{message.text}</p>
      </div>
    </div>
  );
};

export default Message;
