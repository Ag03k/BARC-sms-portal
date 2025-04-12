import React, { useState } from 'react';
import './Homepage.css';
import UserList from './UserList.js';
import axios from 'axios';

const Homepage = () => {
  const initialId = "your_manual_id"; // Manually enter the desired initial ID
  const [isEmployee, setIsEmployee] = useState(false);
  const [isNonEmployee, setIsNonEmployee] = useState(false);
  const [action, setAction] = useState('');
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [displayUserList, setDisplayUserList] = useState(false);

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    if (selectedRole === 'true') {
      setIsEmployee(true);
      setIsNonEmployee(false);
    } else if (selectedRole === 'false') {
      setIsEmployee(false);
      setIsNonEmployee(true);
    } else {
      setIsEmployee(false);
      setIsNonEmployee(false);
    }
  };

  const handleActionChange = (e) => {
    setAction(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if is_employee and is_non_employee values are valid
    const isValidRole = (isEmployee && !isNonEmployee) || (!isEmployee && isNonEmployee);

    if (!isValidRole) {
      alert('Invalid role selection! Please select a valid role.');
      return;
    }

    // Prepare the data object to be sent to the backend
    const userData = {
      id: initialId,
      username: name,
      email: email,
      is_employee: isEmployee ? true : false,
      is_non_employee: isNonEmployee ? true : false,
      contact_number: contactNumber,
    };

    axios
      .post('http://127.0.0.1:8000/api/users/', userData)
      .then((response) => {
        // Handle the response from the backend
        console.log(response.data); // Log the response data or perform any necessary actions
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error(error);
        alert('An error occurred while submitting the form. Please try again.');
      });

    // Reset the form fields after submission
    setIsEmployee(false);
    setIsNonEmployee(false);
    setAction('');
    setName('');
    setContactNumber('');
    setEmail('');
    setDisplayUserList(true);
  };

  return (
    <div className="homepage">
      <div className="login-section">
        <h3>You are logged in as Admin</h3>
        <h2>View User List:</h2>
        {displayUserList ? (
          <UserList />
        ) : (
          <button onClick={() => setDisplayUserList(true)}>User List</button>
        )}

        {/* Create User form */}
        <div className="create-user">
          <h2>Edit User</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-section">
              <label htmlFor="role">Role:</label>
              <select
                id="role"
                value={isEmployee ? 'true' : isNonEmployee ? 'false' : ''}
                onChange={handleRoleChange}
                required
              >
                <option value="">Select a role</option>
                <option value="true">Employee</option>
                <option value="false">Non-Employee</option>
                <option value="true">Admin</option>
                {/* <option>Group</option> */}

              </select>
            </div>

            <div className="form-section">
              <label htmlFor="action">Action:</label>
              <select
                id="action"
                value={action}
                onChange={handleActionChange}
                required
              >
                <option value="">Select an action</option>
                <option value="Add">Add</option>
                <option value="Remove">Remove</option>
              </select>
            </div>

            {(action === 'Add' || action === 'Remove') && (
              <div>
                <div className="form-section">
                  <h2>{action} User Details</h2>
                </div>

                <div className="form-section">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-section">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-section">
                  <label htmlFor="isEmployee">Is Employee:</label>
                  <select
                    id="isEmployee"
                    value={isEmployee ? 'true' : 'false'}
                    onChange={handleRoleChange}
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>
                </div>

                <div className="form-section">
                  <label htmlFor="isNonEmployee">Is Non-Employee:</label>
                  <select
                    id="isNonEmployee"
                    value={isNonEmployee ? 'true' : 'false'}
                    onChange={handleRoleChange}
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>
                </div>

                <div className="form-section">
                  <label htmlFor="contactNumber">Contact Number:</label>
                  <input
                    type="text"
                    id="contactNumber"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
