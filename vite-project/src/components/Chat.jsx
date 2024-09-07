import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Message from './Message';
import { useAuth } from '../hooks/useAuth';
import './Chat.css';

const Chat = () => {
  const { token: jwtToken } = useAuth(); 
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  const [error, setError] = useState(null);

  const fakeChat = [
    {
      text: "Tja tja, hur mår du?",
      avatar: "https://i.pravatar.cc/100?img=14",
      username: "Johnny",
      conversationId: null,
      id: 1,
      isFake: true, 
    },
    {
      text: "Hallå!! Svara då!!",
      avatar: "https://i.pravatar.cc/100?img=14",
      username: "Johnny",
      conversationId: null,
      id: 2,
      isFake: true, 
    },
    {
      text: "Sover du eller?! 😴",
      avatar: "https://i.pravatar.cc/100?img=14",
      username: "Johnny",
      conversationId: null,
      id: 3,
      isFake: true, 
    }
  ];

  const getCsrfToken = useCallback(async () => {
    try {
      const response = await axios.patch('https://chatify-api.up.railway.app/csrf', {}, {
        headers: {
          'Accept': 'application/json',
        },
      });
      setCsrfToken(response.data.csrfToken);
    } catch (error) {
      console.error('Error fetching CSRF token:', error);
    }
  }, []);

  useEffect(() => {
    if (jwtToken) {
      getCsrfToken();
      fetchMessages(); 
    }
  }, [jwtToken, getCsrfToken]);

  const fetchMessages = useCallback(async () => {
    try {
      const response = await axios.get('https://chatify-api.up.railway.app/messages', {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });
      setMessages(response.data);
    } catch (error) {
      setError('Error fetching messages.');
      console.error('Error fetching messages:', error);
    }
  }, [jwtToken]);

  const handleSend = async () => {
    if (!newMessage.trim() || !jwtToken || !csrfToken) return;

    try {
      await axios.post(
        'https://chatify-api.up.railway.app/messages',
        { text: newMessage },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken
          }
        }
      );

      setNewMessage('');
      fetchMessages(); 
    } catch (error) {
      setError('Error sending message.');
      console.error('Error sending message:', error);
    }
  };

  const deleteMessage = async (msgID, isFake) => {
    if (isFake) {
      
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.id !== msgID)
      );
      console.log("Fake message deleted:", msgID);
      return;
    }

    if (jwtToken) {
      try {
        const response = await fetch(`https://chatify-api.up.railway.app/messages/${msgID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        if (response.ok) {
          setMessages((prevMessages) =>
            prevMessages.filter((msg) => msg.id !== msgID)
          );
          console.log("Message deleted:", msgID);
        } else {
          console.error("Failed to delete message:", msgID);
        }
      } catch (error) {
        console.error("Error deleting message:", error);
      }
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {fakeChat.map((msg) => (
          <div
            key={msg.id}
            className={`message ${msg.username === 'Johnny' ? 'left' : 'right'}`}
          >
            <img src={msg.avatar} alt="avatar" className="avatar" />
            <div className="message-content">
              <p>{msg.text}</p>
              {msg.username !== 'Johnny' && (
                <button onClick={() => deleteMessage(msg.id, true)}>Delete</button>
              )}
            </div>
          </div>
        ))}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${msg.username === 'Johnny' ? 'left' : 'right'}`}
          >
            <img src={msg.avatar} alt="avatar" className="avatar" />
            <div className="message-content">
              <p>{msg.text}</p>
              {msg.username !== 'Johnny' && (
                <button onClick={() => deleteMessage(msg.id, false)}>Delete</button>
              )}
            </div>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSend}>Send</button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Chat;
