import React, { useState } from 'react';
import './Profile.css';
const Profile = () => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [univBatch, setUnivBatch] = useState('2022');
    const [orgBatch, setOrgBatch] = useState('Reboot');
    const [bio, setBio] = useState('');

    const toggleEdit = () => {
        setIsEditMode(!isEditMode);
    };


    return (
        <>
        <div style={{ backgroundColor: '#d6dbea' }}>
        <div className="profile-container">
            <div className="profile-header">
                <div className="account-header-container">
                    <h1 className="account-header">Account Management</h1>
                    <h5 className="text2">/ Profile</h5>
                </div>
            </div>
            <div title="Account Management" breadcrumb="/ Profile">
                <div className="profile-information">
                    <div className="profile-information-1">
                        <div className="profile-information-1-photo">
                            <img src="" alt="profile pic" className="profile2"/>
                            <p id="changePhoto" className="change-photo" style={{display: isEditMode ? 'block' : 'none', color: isEditMode ? '#1e85b6' : '#ffff'}}>
                                <i className="material-symbols-outlined">photo_camera</i> Change photo
                            </p>
                        </div>
                        <div className="profile-information-1-name">
                            <h1 className="account-header">Surprised Pikachu</h1>
                            <div className={`bio-display-container ${isEditMode ? 'edit-mode' : ''}`}> {/* Apply the class conditionally */}
                                <p id="bioDisplay" className="bio">{univBatch} | {orgBatch}</p>
                            </div>
                            <div id="bioEditFields" style={{display: isEditMode ? 'block' : 'none'}}>
                                <label htmlFor="univBatchInput" className="bio1">University Batch:</label>
                                <input
                                    type="text"
                                    id="univBatchInput"
                                    name="univBatch"
                                    placeholder="Enter University Batch"
                                    value={univBatch}
                                    onChange={(e) => setUnivBatch(e.target.value)}
                                />

                                <label htmlFor="orgBatchInput" className="bio1">Organization Batch:</label>
                                <input
                                    type="text"
                                    id="orgBatchInput"
                                    name="orgBatch"
                                    placeholder="Enter Organization Batch"
                                    value={orgBatch}
                                    onChange={(e) => setOrgBatch(e.target.value)}
                                />
                            </div>
                            <form>
                                <label className="bio1" id="bio1">{isEditMode ? 'Edit Bio' : 'Bio'}</label>
                                <input
                                    type="text"
                                    id="bioInput"
                                    name="bio"
                                    className="bio1"
                                    placeholder="Please tell us more about yourself."
                                    disabled={!isEditMode}
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                />
                            </form>
                        </div>
                    </div>
                   <div className="profile-information-2">
                        <p>MENTOR INFORMATION</p>
                        <br></br>
                        <hr />
                        <div className="add-mentor">
                            <button className="mentor-button">
                                <i className="material-icons">person_add</i>
                                <span>Invite Mentor</span>
                            </button>
                        </div>
                   </div>
                </div>
                <div className="edit-profile">
                    <button className="edit-button" onClick={toggleEdit}>
                        <i className="material-symbols-outlined">{isEditMode ? 'check' : 'edit'}</i>
                        <span>{isEditMode ? 'Save' : 'Edit'}</span>
                    </button>
                </div>
            </div>
        </div>
            
        </div>
        </>
    );
};

export default Profile;