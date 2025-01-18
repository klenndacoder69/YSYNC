import React, { useEffect, useRef, useState } from "react";
import "./Createtriggered.css";
import uploadIcon from "/assets/upload.png";
import linkIcon from "/assets/link.png";
import api from "../../../api/axios";
function Createtriggered({ onCancel, userId, fetchPosts }) {
  const fileInputRef = useRef(null);
  const linkInputRef = useRef(null);
  const [pinned, setPinned] = useState(false);
  const [event, setEvent] = useState(false);
//   const [currentDate, setCurrentDate] = useState(new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState("00:00");
  const [eventDate, setEventDate] = useState(new Date());
  const [content, setContent] = useState("");
  useEffect(() => {
    console.log(pinned);
    console.log(eventDate);
    // console.log(currentDate);
    console.log(time);
    console.log(content);
  }, [pinned, eventDate, time, content])
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleLinkClick = () => {
    linkInputRef.current.focus();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file);
      // Handle file upload logic here
      alert("File uploaded");
    }
  };

  const handleLinkChange = (event) => {
    const link = event.target.value;
    if (link) {
      console.log("Input link:", link);
      alert("Link added");
    }
  };

  const handleSubmit = async () => {
    try{
      const response = await api.post("/posts", {
        userId: userId,
        isEvent: event,
        eventDate: new Date(),
        isPinned: pinned,
        content: content,
      });
      if (response) {
        alert("Post created successfully!");
        fetchPosts();
      }
    } catch (error) {
      if (error.response) {
        console.log("Error response status: ", error.response.status);
      } else {
        console.error("Error message: ", error.message);
      }
    }
  }

  return (
    <div className="dashboard-createtriggered-container">
      <div className="dashdashboard-createtriggered-announcement">
        <input
          type="text"
          className="dashboard-createtriggered-announcement-input"
          placeholder="Input your announcement here"
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="dashboard-createtriggered-options">
        <div className="dashboard-createtriggered-options-left">
          <div className="dashboard-createtriggered-options-left-upload">
            <button onClick={handleUploadClick}>
              <img src={uploadIcon} alt="upload" />
            </button>
            <input
              type="file"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*, video/*"
            />
          </div>
          <div className="dashboard-createtriggered-options-left-link">
            <button onClick={handleLinkClick}>
              <img src={linkIcon} alt="link" />
            </button>
            <input
              type="text"
              style={{ display: "none" }}
              ref={linkInputRef}
              onChange={handleLinkChange}
              placeholder="Input link here"
            />
          </div>
        </div>
        <div className="dashboard-createtriggered-options-middle">
          <div className="dashboard-createtriggered-options-middle-toggle">
            <div className="dashboard-createtriggered-options-middle-toggle-pinned">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={pinned}
                  onChange={() => setPinned(!pinned)}
                />
                <span className="slider round"></span>
              </label>
              Pinned
            </div>
            <div className="dashboard-createtriggered-options-middle-toggle-event">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={event}
                  onChange={() => setEvent(!event)}
                />
                <span className="slider round"></span>
              </label>
              Event
            </div>
          </div>
          <div className="dashboard-createtriggered-options-middle-datetime">
            <div className="dashboard-createtriggered-options-middle-datetime-time">
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
              Time
            </div>
            <div className="dashboard-createtriggered-options-middle-datetime-date">
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
              />
              Date
            </div>
          </div>
        </div>
        <div className="dashboard-createtriggered-options-right">
          <div className="dashboard-createtriggered-options-right-cancel">
            <button onClick={onCancel}>Cancel</button>
          </div>
          <div className="dashboard-createtriggered-options-right-post">
            <button onClick={handleSubmit}>Post</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Createtriggered;
