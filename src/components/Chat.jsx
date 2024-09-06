// src/components/Chat.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Message from './Message';
import { useAuth } from '../hooks/useAuth';

const Chat = () => {
  const { jwtToken } = useAuth(); // Hook för att hämta token
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await axios.get('https://chatify-api.up.railway.app/messages', {
          headers: { Authorization: `Bearer ${jwtToken}` },
        });
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    }
    fetchMessages();
  }, [jwtToken]);

  const handleSend = async () => {
    try {
      await axios.post(
        'https://chatify-api.up.railway.app/messages',
        { text: newMessage },
        { headers: { Authorization: `Bearer ${jwtToken}` } }
      );
      setNewMessage('');
      // Refresh messages
      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <div className="messages">
        {messages.map((msg) => (
          <Message key={msg.id} message={msg} />
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default Chat;
