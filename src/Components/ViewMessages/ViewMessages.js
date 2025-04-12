import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewMessages.css';

const ViewMessages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch messages from the backend using Axios
    axios
      .get('http://127.0.0.1:8000/api/messages/') 
      .then((response) => {
        setMessages(response.data); // Assuming the response data is an array of message objects
      })
      .catch((error) => {
        console.log('Error fetching messages:', error);
      });
  }, []);

  return (
    <div className="view-messages">
      <h2>Message List</h2>

      <table className="messages-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Subject</th>
            <th>Body</th>
            <th>Created At</th>
            <th>Sent At</th>
            <th>Message Group</th>
            <th>Template</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => (
            <tr key={message.id}>
              <td>{message.id}</td>
              <td>{message.subject}</td>
              <td>{message.body}</td>
              <td>{message.created_at}</td>
              <td>{message.sent_at}</td>
              <td>{message.message_group}</td>
              <td>{message.template}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewMessages;
