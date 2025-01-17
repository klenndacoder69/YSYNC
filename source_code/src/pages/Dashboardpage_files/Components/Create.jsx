import React from 'react';
import './Create.css';
import profilePic from '/assets/profile.jpg';

function Create({ onCreateClick }) {
    return (
      <div className="dashboard-create-button">
        <button onClick={onCreateClick}>
            <img src={profilePic} alt="profile pic" className="dashboard-create-profile" />
            <div className="dashboard-create-text">
                Make an announcement
            </div>
        </button>
      </div>
    );
  }

export default Create;