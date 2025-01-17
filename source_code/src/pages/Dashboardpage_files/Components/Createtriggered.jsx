import React, { useRef } from 'react';
import './Createtriggered.css';
import uploadIcon from '/assets/upload.png';
import linkIcon from '/assets/link.png';

function Createtriggered({ onCancel }) {
    const fileInputRef = useRef(null);
    const linkInputRef = useRef(null)

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

    const handleLinkClick = () => {
        linkInputRef.current.focus();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log('Selected file:', file);
          // Handle file upload logic here
          alert('File uploaded');
        }
    };

    const handleLinkChange = (event) => {
      const link = event.target.value
        if (link) {
            console.log('Input link:', link);
            alert('Link added');
        }
    };



    return (
        <div className="dashboard-createtriggered-container">
            <div className="dashdashboard-createtriggered-announcement">
                <input type="text" placeholder="Input your announcement here"/>
            </div>
            <div className="dashboard-createtriggered-options">
                <div className="dashboard-createtriggered-options-left">
                    <div className="dashboard-createtriggered-options-left-upload">
                        <button onClick={handleUploadClick}>
                            <img src={uploadIcon} alt="upload"/>
                        </button>
                         <input
                            type="file"
                             style={{ display: 'none' }}
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*, video/*"
                        />
                    </div>
                    <div className="dashboard-createtriggered-options-left-link">
                       <button onClick={handleLinkClick}>
                           <img src={linkIcon} alt="link"/>
                       </button>
                         <input
                            type="text"
                             style={{ display: 'none' }}
                            ref={linkInputRef}
                            onChange={handleLinkChange}
                            placeholder='Input link here'
                        />
                    </div>
                </div>
                <div className="dashboard-createtriggered-options-middle">
                    <div className="dashboard-createtriggered-options-middle-toggle">
                        <div className="dashboard-createtriggered-options-middle-toggle-pinned">
                            <label className="switch">
                                <input type="checkbox"/>
                                <span className="slider round"></span>
                            </label>
                            Pinned
                        </div>
                        <div className="dashboard-createtriggered-options-middle-toggle-event">
                            <label className="switch">
                                <input type="checkbox"/>
                                <span className="slider round"></span>
                            </label>
                            Event
                        </div>
                    </div>
                    <div className="dashboard-createtriggered-options-middle-datetime">
                        <div className="dashboard-createtriggered-options-middle-datetime-time">
                            <input type="time"/>
                            Time
                        </div>
                        <div className="dashboard-createtriggered-options-middle-datetime-date">
                            <input type="date"/>
                            Date
                        </div>
                    </div>
                </div>
                <div className="dashboard-createtriggered-options-right">
                    <div className="dashboard-createtriggered-options-right-cancel">
                        <button onClick={onCancel}>Cancel</button>
                    </div>
                    <div className="dashboard-createtriggered-options-right-post">
                        <button>Post</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Createtriggered;