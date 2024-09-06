// src/components/Message.jsx
import React from 'react';

const Message = ({ message }) => {
  return (
    <div className={message.isOwn ? 'message-right' : 'message-left'}>
      <p>{message.text}</p>
    </div>
  );
};

export default Message;
