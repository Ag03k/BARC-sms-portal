import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Members.css';

const Members = () => {
  const [searchBy, setSearchBy] = useState('username');
  const [searchValue, setSearchValue] = useState('');
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [members, setMembers] = useState([]);

  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
  };

  const handleSearchValueChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Perform search logic based on searchBy and searchValue
    // You can implement the search functionality here or call a function from a service/utility
    console.log('Searching:', searchBy, searchValue);
  };

  const handleContactClick = (employeeId, employeeName, contactNumber) => {
    // Perform action to send a personal message to the employee using the contactNumber
    console.log(`Sending personal message to ${employeeName} (ID: ${employeeId}) - Contact: ${contactNumber}`);
  };

  const handleSelectAllChange = (e) => {
    const checked = e.target.checked;
    setSelectAll(checked);
    if (checked) {
      // Select all items
      setSelectedItems(members.map((member) => member.id));
    } else {
      // Deselect all items
      setSelectedItems([]);
    }
  };

  const handleItemCheckboxChange = (itemId) => {
    return (e) => {
      const checked = e.target.checked;
      if (checked) {
        // Add item to selectedItems
        setSelectedItems((prevSelectedItems) => [...prevSelectedItems, itemId]);
      } else {
        // Remove item from selectedItems
        setSelectedItems((prevSelectedItems) => prevSelectedItems.filter((id) => id !== itemId));
      }
    };
  };

  useEffect(() => {
    // Fetch member details from the backend using Axios
    axios.get('http://127.0.0.1:8000/api/users/') // Replace 'your-api-endpoint' with the actual API endpoint URL
      .then((response) => {
        setMembers(response.data); // Assuming the response data is an array of member objects
      })
      .catch((error) => {
        console.log('Error fetching member details:', error);
      });
  }, []);

  return (
    <div className="members">
      <h2>Contact List</h2>

      <div className="search-section">
        <div className="search-options">
          <label htmlFor="searchBy">Search Criteria:</label>
          <div className="select-container">
            <select id="searchBy" value={searchBy} onChange={handleSearchByChange}>
              <option value="username">Employee Name</option>
              <option value="id">Employee ID</option>
              <option value="contact_number">Contact Number</option>
            </select>
          </div>
        </div>

        <div className="search-input">
          <label htmlFor="searchValue">
            {searchBy === 'username' ? 'Enter Employee Name:' : searchBy === 'id' ? 'Enter Employee ID:' : 'Enter Contact Number:'}
          </label>
          <input
            id="searchValue"
            type="text"
            value={searchValue}
            onChange={handleSearchValueChange}
            placeholder={searchBy === 'username' ? 'Employee Name' : searchBy === 'id' ? 'Employee ID' : 'Contact Number'}
          />
        </div>

        <div className="search-button">
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>

      <table className="members-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Contact Number</th>
            <th>
              <select value={selectAll ? 'all' : 'individual'} onChange={handleSelectAllChange}>
                <option value="individual">Select Individual</option>
                <option value="all">Select All</option>
              </select>
            </th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td>{member.id}</td>
              <td>{member.username}</td>
              <td>
                <button
                  className="contact-button"
                  onClick={() => handleContactClick(member.id, member.username, member.contact_number)}
                >
                  {member.contact_number}
                </button>
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(member.id)}
                  onChange={handleItemCheckboxChange(member.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="note">
        <em>Note: To send a personal message, click on the employee Mobile Number.</em>
      </p>
    </div>
  );
};

export default Members;
