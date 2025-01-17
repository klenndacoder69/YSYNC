import { useEffect, useState } from "react";
import api from "../../../api/axios.js";
import { jwtDecode } from "jwt-decode";
import './Profile.css';

const Profile = () => {
    const [resMem, setResMem] = useState(null);
    const [user, setUser] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [univBatch, setUnivBatch] = useState("");
    const [orgBatch, setOrgBatch] = useState("");
    const [bio, setBio] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const toggleEdit = () => {
        setIsEditMode(!isEditMode);
    };

    const fetchUserData = async () => {
        try {
            const token = sessionStorage.getItem("accessToken");
            const decodedToken = jwtDecode(token);
            console.log(decodedToken);
            const resMemResponse = await api.get(`residentmembers/${decodedToken.id}`);
            console.log(resMemResponse.data);
            setResMem(resMemResponse.data); 
            const userResponse = await api.get(`users/${decodedToken.id}`);
            console.log(userResponse.data);
            setUser(userResponse.data);

        } catch (error) {
            setErrorMessage("Failed to fetch data.");
            console.error("Error fetching data:", error);
        }
    };

    // Fetch user data
    useEffect(() => {
        fetchUserData();
        setErrorMessage(''); // Clear any previous error messages
    }, []); // Runs only once after the initial render

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
                            <img src={user && `${user.image}`} alt="profile pic" className="profile2"/>
                            <p id="changePhoto" className="change-photo" style={{display: isEditMode ? 'block' : 'none', color: isEditMode ? '#1e85b6' : '#ffff'}}>
                                <i className="material-symbols-outlined">photo_camera</i> Change photo
                            </p>
                        </div>
                        <div className="profile-information-1-name">
                            <h1 className="account-header">{user && `${user.firstName} ${user.middleName} ${user.lastName}`}</h1>
                            <div className={`bio-display-container ${isEditMode ? 'edit-mode' : ''}`}> {/* Apply the class conditionally */}
                                <p id="bioDisplay" className="bio">{resMem && `${resMem.orgBatch}`}</p>
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

                    
                            </div>
                            <form>
                                <label className="bio1" id="bio1">{isEditMode ? 'Edit Bio' : 'Bio'}</label>
                                <input
                                    type="text"
                                    id="bioInput"
                                    name="bio"
                                    className="bio1"
                                    placeholder={user && `${user.about}`}
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