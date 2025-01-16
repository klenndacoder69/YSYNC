import React, { useState } from "react";
import "./ChatComponent.css";
import ConnectProfile from "../Connectprofile.jsx";

import commentIcon from "../images/speech-bubble.png";

export default function ChatComponent({ chat }) {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const toggleHeart = () => {
    setLikes((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1));
    setIsLiked(!isLiked);
  };

  const handleProfileClick = () => {
    setShowProfile(true); 
  };

  const closeProfile = (event) => {
    event.preventDefault(); 
    setShowProfile(false);
  };

  return (
    <div className="chat">
      <div className="chatProfile">
        <img
          src={chat.profilePic}
          alt="profile pic"
          className="profileChat"
        />
      </div>
      <div className="chatInfo">
        <div className="chatName">
          <div className="chatN">
            <h1>{chat.name}</h1>
          </div>
          <div className="chatD">
            <h2 className="chatD2">{chat.date}</h2>
          </div>
          <div className="chatS">
            <a
              id="chatInfoSettings"
              className="chatInfoSetting"
              onClick={handleProfileClick} // Open profile on click
              href="#"
            >
              ...
            </a>
          </div>
        </div>
        {chat.message && (
          <div className="chatTitle">
            <div className="chatT">
              <h1 className="chatT2">{chat.title}</h1>
            </div>
            <div className="chatP">
              <p>{chat.message}</p>
            </div>
          </div>
        )}
        {chat.image && (
          <div className="chatTitle">
            <div className="chatImageConnect">
              <img
                src={chat.image}
                alt="chat image"
                className="chatImage"
              />
            </div>
          </div>
        )}
        <div className="chatInteract">
          <div className="heartContainerConnect">
            <button
              className="heartIconConnect"
              onClick={toggleHeart}
            >
              {isLiked ? "♥" : "♡"}
            </button>
            <h2 className="counterHeartConnect">{likes}</h2>
          </div>
          <div className="commentContainerConnect">
            <button className="commentIconConnect">
              <img
                src = {commentIcon}
                alt="Comment Icon"
                className="speech-icon"
              />
            </button>
            {/* <h2 className="counterCommentConnect">{chat.comments}</h2> */}
          </div>
        </div>
      </div>

      {showProfile && (
        <div className="connect-profile-modal">
          <div className="profile-content">
            <button className="close-button" onClick={closeProfile}>
              X
            </button>
            <ConnectProfile key={chat.id} chat={chat} />
          </div>
        </div>
      )}
    </div>
  );
}
