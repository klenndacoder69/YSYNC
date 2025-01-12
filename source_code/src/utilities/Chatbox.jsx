import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000'); 

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    // Listen for new messages
    socket.on('chat_message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Listen for user count updates
    socket.on('user_count', (count) => {
      setUserCount(count);
    });

    // Cleanup on component unmount
    return () => {
      socket.off('chat_message');
      socket.off('user_count');
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('chat_message', message);
      setMessage('');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>Chat Room</h2>
      <p>Active Users: {userCount}</p>
      <div style={{ border: '1px solid #ccc', height: '300px', overflowY: 'scroll', marginBottom: '10px' }}>
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.id}:</strong> {msg.message}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
        style={{ width: '80%', marginRight: '10px' }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
