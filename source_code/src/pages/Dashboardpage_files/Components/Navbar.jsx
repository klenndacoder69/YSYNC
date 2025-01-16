import React, { useState } from 'react';
import './Navbar.css';
import Dropdown from './Dropdown.jsx';
import profilePic from '/Users/bry/Desktop/YSYNC_Project/YSYNC_Project_PAD/ysync_plain/assets/profile.jpg';

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="parentNav">
            <div className="logoname">
                {//<img src={logo} alt="YSES Logo" className="logo" />
                }
                <div className="navi">YSYNC</div>
            </div>
            <ul className="navButtons">
                <li id="dashboard" className="button">
                    <a href="../dashboard/pages/dashboard-trainee-announcement.html">Dashboard</a>
                </li>
                <li id="connect" className="button">
                    <a href="../connect/connect-trainee.html">Connect</a>
                </li>
                <li id="mentors" className="button">
                    <a href="../mentor info/pages/dashboard-trainee-mentor-choosing.html">Mentors</a>
                </li>
                <li id="residentMembers" className="button">
                    <a href="../resmem/resmemInfo-trainee.html">Resident Members</a>
                </li>
            </ul>
            <button onClick={toggleDropdown} className="profile-button">
                <img src={profilePic} alt="profile pic" className="profile"/>
            </button>
          <Dropdown isOpen={isDropdownOpen} toggleDropdown={toggleDropdown}/>
        </div>
    );
};

export default Navbar;