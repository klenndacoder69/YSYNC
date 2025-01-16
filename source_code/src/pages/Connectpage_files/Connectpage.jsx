import React from "react";
import { Link } from "react-router-dom"; 
import ChatComponent from "./connect_components/ChatComponent";
import "./ConnectPage.css";

// pangtest lang for image profile
import profilePic from "./images/profile.jpg";


export default function ConnectPage() {
  const accountDropdown = () => {
    const dropdown = document.getElementById("drop");
    dropdown.classList.toggle("acc-show");
  };

  const closeDropdown = (event) => {
    if (
      !event.target.matches(".acc-buttonDrop") &&
      !event.target.matches(".profile")
    ) {
      const dropdown = document.getElementById("drop");
      if (dropdown.classList.contains("acc-show")) {
        dropdown.classList.remove("acc-show");
      }
    }
  };

  React.useEffect(() => {
    window.addEventListener("click", closeDropdown);
    return () => {
      window.removeEventListener("click", closeDropdown);
    };
  }, []);

  const chats = [
    {
      id: 1,
      profilePic: profilePic,
      name: "Pikachu",
      date: "September 9, 2024 | 12:30pm",
      settingsLink: "connect-trainee-profile.html",
      title: "EME EME EME",
      message:
        "When I was a young boy my father took me into the city to see a marching band...",
      comments: 1,
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      mentorInfo: "No Information"
    },
    {
      id: 2,
      profilePic: "connect-post-images/profile.jpg",
      name: "HAHAA",
      date: "September 9, 2024 | 12:30pm",
      settingsLink: "connect-trainee-profile.html",
      image: "connect-post-images/sadPepe.png",
      comments: 1,
      bio: "Test2",
      mentorInfo: "No Information"
    },
    {
      id: 3,
      profilePic: "connect-post-images/profile.jpg",
      name: "Mero",
      date: "September 9, 2024 | 12:30pm",
      settingsLink: "connect-trainee-profile.html",
      title: "EME EME EME",
      message:
        "When I was a young boy my father took me into the city to see a marching band...",
      comments: 1,
      bio: "test3",
      mentorInfo: "No Information"
    },
  ];

  return (
    <>
      {/* Navigation Code */}
      <div className="parentNav">
        <div className="logoname">
          <img
            src="connect-post-images/logo.png"
            alt="YSES Logo"
            className="logo"
          />
          <div className="navi">YSYNC</div>
        </div>

        <ul className="navButtons">
          <li id="dashboard" className="button">
            <a href="../dashboard/pages/dashboard-trainee-announcement.html">
              Dashboard
            </a>
          </li>
          {/* <li id="connect" className="button active">
            <a href="../connect/connect-trainee.html">Connect</a>
          </li> */}
          <Link to ="/connect" className="button active">Connect</Link>
          <li id="mentors" className="button">
            <a href="../mentor info/pages/dashboard-trainee-mentor-choosing.html">
              Mentors
            </a>
          </li>
          <li id="residentMembers" className="button">
            <a href="../resmem/resmemInfo-trainee.html">Resident Members</a>
          </li>
        </ul>

        <button onClick={accountDropdown} className="profile-button">
          <img
            src="../../assets/profile.jpg"
            alt="profile pic"
            className="profile"
          />
        </button>
      </div>

      {/* Dropdown */}
      <div className="acc-parentNav" id="drop">
        <a href="../account-management/profile.html" id="profile">
          Profile
        </a>
        <a href="../account-management/report.html" id="report">
          Report
        </a>
        <a href="defer.html" id="defer">
          Defer
        </a>
        <p></p>
        <a href="../../index.html" className="logout" style={{ fontWeight: "bold" }}>
          Log Out
        </a>
      </div>

      {/* Chats Section */}
      <div className="message">
        <div className="connect-left"></div>
        <div className="connect">
          <div className="connectTitle">
            <h1 className="connectTitleT">Connect</h1>
          </div>
          {chats.map((chat) => (
            <ChatComponent key={chat.id} chat={chat} />
          ))}
        </div>
        <div className="connect-right"></div>
      </div>

      {/* Add Post Button (modified to use Link) */}
      <div className="addPostConnect">
        <Link to="/connect-post" className="postConnect">
          <img
            src="connect-post-images/post2.png"
            alt="post icon"
            className="post-icon"
          />
        </Link>
      </div>
    </>
  );
}
