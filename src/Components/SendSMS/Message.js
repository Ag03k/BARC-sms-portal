import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Message.css';

const Message = () => {
  const [selectedEntity, setSelectedEntity] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [groups, setGroups] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [messageContent, setMessageContent] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [templateContent, setTemplateContent] = useState('');

  useEffect(() => {
    // Fetch groups from the backend using Axios
    axios
      .get('http://127.0.0.1:8000/api/groups/') // Replace 'your-api-endpoint' with the actual API endpoint URL for groups
      .then((response) => {
        setGroups(response.data); // Assuming the response data is an array of group objects
      })
      .catch((error) => {
        console.log('Error fetching groups:', error);
      });

    // Fetch templates from the backend using Axios
    axios
      .get('http://127.0.0.1:8000/api/templates/') // Replace 'your-api-endpoint' with the actual API endpoint URL for templates
      .then((response) => {
        setTemplates(response.data); // Assuming the response data is an array of template objects
      })
      .catch((error) => {
        console.log('Error fetching templates:', error);
      });
  }, []);

  const handleEntityChange = (e) => {
    setSelectedEntity(e.target.value);
  };

  const handleMobileNumberChange = (e) => {
    setMobileNumber(e.target.value);
  };

  const handleGroupChange = (e) => {
    setSelectedGroup(e.target.value);
  };

  const handleTemplateChange = (e) => {
    const selectedTemplateId = e.target.value;
    setSelectedTemplate(selectedTemplateId);

    // Fetch the content of the selected template from the backend using Axios
    axios
      .get(`http://127.0.0.1:8000/api/templates/${selectedTemplateId}`) // Replace 'your-api-endpoint' with the actual API endpoint URL for the template content
      .then((response) => {
        setTemplateContent(response.data.content);
      })
      .catch((error) => {
        console.log('Error fetching template content:', error);
      });
  };

  const handleSendButtonClick = () => {
    // Handle sending the message based on the selected entity, mobile number, selected group, and selected template
    console.log('Sending message...');
  };

  return (
    <div className="message-page">
      <h2 className="message-heading">Send Message Now</h2>

      <div className="message-box">
        <div className="message-options">
          <label>
            Select Entity:
            <select value={selectedEntity} onChange={handleEntityChange}>
              <option value="">Select</option>
              <option value="mobile-number">Mobile Number</option>
              <option value="mobile-group">Mobile Group</option>
            </select>
          </label>
        </div>

        {selectedEntity === 'mobile-number' && (
          <div className="mobile-number-input">
            <label htmlFor="mobile-number">Enter Mobile Number:</label>
            <input type="text" id="mobile-number" value={mobileNumber} onChange={handleMobileNumberChange} />
          </div>
        )}

        {selectedEntity === 'mobile-group' && (
          <div className="group-selection">
            <label>Select Group:</label>
            <select value={selectedGroup} onChange={handleGroupChange}>
              <option >Employee</option>
              <option >Non-Employee</option>
              <option value="">Select Group</option>
              {groups.map((group) => (
                <option key={group.id} value={group.name}>{group.name}</option>
              ))}
            </select>
          </div>
        )}

        <div className="message-content">
          <p>Your Message:</p>
          <textarea className="message-textarea" rows="5" value={messageContent} onChange={(e) => setMessageContent(e.target.value)} />

          <div className="template-selection">
            <label htmlFor="template-select">Select Template:</label>
            <select id="template-select" value={selectedTemplate} onChange={handleTemplateChange}>
              <option value="">None</option>
              {templates.map((template) => (
                <option key={template.id} value={template.id}>{template.name}</option>
              ))}
            </select>
          </div>

          {templateContent && (
            <div className="template-content">
              <p>Template Content:</p>
              <textarea className="template-textarea" rows="5" value={templateContent} disabled />
            </div>
          )}
        </div>

        <button className="send-button" onClick={handleSendButtonClick}>Send Message Now</button>
      </div>
    </div>
  );
};

export default Message;
