import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import User from './Components/Users/Users';
import Homepage from './Components/Homepage/Homepage';
import Members from './Components/Members/Members';
import Message from './Components/SendSMS/Message';
import ViewMessages from './Components/ViewMessages/ViewMessages';
import { FiMenu } from 'react-icons/fi';
import logo from './logo.png';
import Templates from './Components/Templates/Templates';


const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="navbar">
      <div className="sms-portal">
        <b>Onclick SMS Portal</b>
      </div>
      <div className="menu-icon" onClick={handleToggleMenu}>
        <FiMenu />
      </div>
      {showMenu && (
        <ul className="navbar-items">
          <li>
            <NavLink activeClassName="active" to="/">
              Homepage
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/members">
              Members
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/message">
              Send SMS
            </NavLink>
          </li>
          <li>
          </li>
          <li>
            <NavLink activeClassName="active" to="/view-messages">
              View Messages
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/templates">
              Templates
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/user">
              User
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
};

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <span>
          &copy; Site Owned & Maintained by: Bhabha Atomic Research Centre (BARC), Department of Atomic Energy (DAE),
          Government of India.
        </span>
      </div>
      <div className="logo">
        <img src={logo} alt="Logo" width="50" />
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/members" element={<Members />} />
            <Route path="/user" element={<User />} />
            <Route path="/message" element={<Message />} />
            <Route path="/view-messages" element={<ViewMessages />} />
            <Route path="/templates" element={<Templates />} />


            {/* Add more routes for other pages */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
