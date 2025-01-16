import React from 'react';
import { Link } from "react-router-dom"; 
import './Connectpost.css'; 

const ConnectTraineePost = () => {
//   const createPost = () => {
//     
//     console.log('Post Created');
//   };

  return (
    <div>
      {/* Parent Navigation */}
      <div className="parentNav">
        <div className="logoname">
          <img src="connect-post-images/logo.png" alt="YSES Logo" className="logo" />
          <div className="navi">YSYNC</div>
        </div>

        <ul className="navButtons">
          <li id="dashboard" className="button">
            <a href="../dashboard/pages/dashboard-trainee-announcement.html">Dashboard</a>
          </li>
          <li id="connect" className="button active">
            <a href="../connect/connect-trainee.html">Connect</a>
          </li>
          <li id="mentors" className="button">
            <a href="../mentor info/pages/dashboard-trainee-mentor-choosing.html">Mentors</a>
          </li>
          <li id="residentMembers" className="button">
            <a href="../resmem/resmemInfo-trainee.html">Resident Members</a>
          </li>
        </ul>

        <img src="connect-post-images/profile.jpg" alt="profile pic" className="profile" />
      </div>

      {/* Post Creation Section */}
      <div className="postCreate">
        <div className="post-connect-left"></div>

        <div className="post-connect">
          <div className="post-connectTitle">
            <h1 className="post-connectTitleT">Connect</h1>
            <h2 className="post-connectTitleR">/ Create Post</h2>
          </div>

          <div className="post-make-connect">
            <div className="post-chatProfile">
              <img src="connect-post-images/profile.jpg" alt="profile pic" className="postProfileChat" />
            </div>

            <div className="post-create">
              <div className="entryarea">
                <textarea className="inputSize" placeholder="Write Post..."></textarea>
              </div>
              <div className="post-logo">
                <button className="post-paperClip">
                  <img src="connect-post-images/paperclip.png" alt="chat image" className="paperclipImage" />
                </button>
                <button className="post-bullets">
                  <img src="connect-post-images/bullets.png" alt="chat image" className="bulletImage" />
                </button>
                <button className="post-share">
                  <img src="connect-post-images/share.png" alt="chat image" className="shareImage" />
                </button>
              </div>
            </div>
          </div>

          <div className="post-buttons">
            {/* <a href="connect-trainee.html" className="post-create-button" onClick={createPost}>
              Create
            </a>
            <a href="connect-trainee.html" className="post-cancel-button">
              Cancel
            </a> */}
            <Link to ="/connect" className="post-create-button">Create</Link>
            <Link to ="/connect" className="post-cancel-button">Cancel</Link>
          </div>
        </div>

        <div className="post-connect-right"></div>
      </div>
    </div>
  );
};

export default ConnectTraineePost;
