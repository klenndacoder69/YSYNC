import React from "react";
import "./Connectprofile.css"; 

const ConnectProfile = ({chat}) => {
  return (
    <div>
      <div className="connect-profile-info">
        <div className="left-side-connect-profile"></div>

        <div className="middle">
          <div className="goBackArrow">
            <a className="connect-go-back">
              Account Information
            </a>
          </div>

          <div className="postProfile">
            <div className="post-pic-bio">
              <div className="post-profile-pic">
                <img
                  src="connect-post-images/profile.jpg"
                  alt="profile pic"
                  className="postProfilePic"
                />
              </div>

              <div className="post-bio-area">
                <h1 className="postName">{chat.name}</h1>
                <h2 className="postBioText">Bio</h2>

                <div className="postBio">
                  <p className="postBioMessage">
                    {chat.bio}
                  </p>
                </div>
              </div>
            </div>

            <div className="post-mentor-info">
              <h1 className="postMentorInfo">MENTOR INFORMATION</h1>
              <div className="postDivider"></div>
              <h2 className="postMentorInfoMessage">{chat.mentorInfo}</h2>
            </div>
          </div>
        </div>

        <div className="right-side-connect-profile"></div>
      </div>
    </div>
  );
};

export default ConnectProfile;
