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
    const [currentUser, setCurrentUser] = useState({});
    const toggleEdit = () => {
        setIsEditMode(!isEditMode);
    };

    useEffect(() => {
        const token = sessionStorage.getItem("accessToken");
        const decodedToken = jwtDecode(token);
        const currentUser = {
            id: decodedToken.id,
            userType: decodedToken.userType,
        };
        setCurrentUser(currentUser);
        console.log(currentUser);
    }, []);

    const isEmpty = (obj) => Object.keys(obj).length === 0;

    const fetchUserData = async () => {
        try {
            const userResponse = await api.get(`users/${currentUser.id}`);
            if(userResponse.data) {
                console.log("This is a normal user, their data is: ", userResponse.data);
                setUser(userResponse.data);
                setBio(userResponse.data.about);
            }
            const traineeResponse = await api.get(`trainees/${currentUser.id}`);
            if(traineeResponse.data) {
                console.log("This is a trainee, their data is: ", traineeResponse.data);
                setUnivBatch(traineeResponse.data.univBatch);
            }
        } catch (error) {
            setErrorMessage("Failed to fetch data.");
            console.error("Error fetching data:", error);
        }
    };

    // fetch the user data
    // this useEffect only runs when userId is already set
    useEffect(() => {
        console.log("Fetching user data of current user: ", currentUser);
        if (isEmpty(currentUser)) {
            console.log("Data is still being fetched...");
            return;
        }
        console.log("Data is now fetched.");
        fetchUserData();
    }, [currentUser]); 

    return (
        <>
        <div style={{ backgroundColor: '#d6dbea' }}>
        <div className="profile-container">
            <div className="profile-header">
                <div className="account-header-container">
                    <h1 className="account-header">Account Management <span className="text2">/ Profile</span></h1>
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
                                <label htmlFor="univBatchInput" className="bio1">University Batch: </label>
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
                                <br/>
                                <label className="bio2" id="bio1">{isEditMode ? 'Edit Bio' : 'Bio'}</label>
                                <input
                                    type="text"
                                    id="bioInput"
                                    name="bio"
                                    className="bio1"
                                    value={bio}
                                    disabled={!isEditMode}
                                    // value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                />
                            </form>
                        </div>
                    </div>
                   {/* <div className="profile-information-2">
                        <p>MENTOR INFORMATION</p>
                        <br></br>
                        <hr />
                   </div> */}
                </div>
                <div className="edit-profile">
                    <button className="edit-button" onClick={toggleEdit}>
                        {/* <i className="material-symbols-outlined">{isEditMode ? 'check' : 'edit'}</i> */}
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