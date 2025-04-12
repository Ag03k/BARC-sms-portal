import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Templates.css';

const Templates = () => {
  const [templates, setTemplates] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [newTemplateName, setNewTemplateName] = useState('');
  const [newTemplateIncident, setNewTemplateIncident] = useState('');
  const [newTemplateContent, setNewTemplateContent] = useState('');

  useEffect(() => {
    // Fetch templates from the backend using Axios
    axios
      .get('http://127.0.0.1:8000/api/templates/') // Replace 'your-api-endpoint' with the actual API endpoint URL
      .then((response) => {
        setTemplates(response.data); // Assuming the response data is an array of template objects
      })
      .catch((error) => {
        console.log('Error fetching templates:', error);
      });

    // Fetch incidents from the backend using Axios
    axios
      .get('http://127.0.0.1:8000/api/incidents/') // Replace 'your-api-endpoint' with the actual API endpoint URL for incidents
      .then((response) => {
        setIncidents(response.data); // Assuming the response data is an array of incident objects
      })
      .catch((error) => {
        console.log('Error fetching incidents:', error);
      });
  }, []);

  const handleAddTemplate = (e) => {
    e.preventDefault();
    // Create a new template object
    const newTemplate = {
      name: newTemplateName,
      incident: newTemplateIncident,
      content: newTemplateContent,
    };

    // Send the new template to the backend using Axios
    axios
      .post('http://127.0.0.1:8000/api/templates/', newTemplate) // Replace 'your-api-endpoint' with the actual API endpoint URL
      .then((response) => {
        // Update the templates state with the newly created template
        setTemplates((prevTemplates) => [...prevTemplates, response.data]);
        // Clear the input fields
        setNewTemplateName('');
        setNewTemplateIncident('');
        setNewTemplateContent('');
      })
      .catch((error) => {
        console.log('Error creating template:', error);
      });
  };

  return (
    <div className="templates">
      <h2>Templates</h2>

      <table className="templates-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Incident</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody>
          {templates.map((template) => (
            <tr key={template.id}>
              <td>
                <button className="template-button">{template.name} (Click on Template to Select)</button>
              </td>
              <td>{template.incident}</td>
              <td>{template.content}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="add-template">
        <h3>Add New Template</h3>
        <form onSubmit={handleAddTemplate}>
          <div className="input-container">
            <label htmlFor="templateName">Name:</label>
            <input
              id="templateName"
              type="text"
              value={newTemplateName}
              onChange={(e) => setNewTemplateName(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="templateIncident">Incident:</label>
            <select
              id="templateIncident"
              value={newTemplateIncident}
              onChange={(e) => setNewTemplateIncident(e.target.value)}
              required
            >
              <option value="">Select Incident</option>
              {incidents.map((incident) => (
                <option key={incident.id} value={incident.name}>
                  {incident.name}
                </option>
              ))}
            </select>
          </div>
          <div className="input-container">
            <label htmlFor="templateContent">Content:</label>
            <textarea
              id="templateContent"
              value={newTemplateContent}
              onChange={(e) => setNewTemplateContent(e.target.value)}
              required
            />
          </div>
          <button type="submit">Add Template</button>
        </form>
      </div>
    </div>
  );
};

export default Templates;
