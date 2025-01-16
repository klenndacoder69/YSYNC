import React, { useEffect } from 'react';
import './Dropdown.css';

const Dropdown = ({ isOpen, toggleDropdown }) => {
    const handleDocumentClick = (event) => {
        if (isOpen && !event.target.closest('.parentNav')) {
          toggleDropdown();
        }
      };

      useEffect(() => {
        document.addEventListener('click', handleDocumentClick);
        return () => {
          document.removeEventListener('click', handleDocumentClick);
        };
      }, [isOpen, toggleDropdown]);
      
    return (
        <div className={`acc-parentNav ${isOpen ? 'acc-show' : ''}`} id="drop">
            <a href="profile" id="profile">Profile</a>
            <a href="report" id="report">Report</a>
            <a href="defer" id="defer">Defer</a>
            <p></p>
            <a href="../../index.html" className="logout" style={{fontWeight: 'bold'}}>Log Out</a>
        </div>
    );
};

export default Dropdown;