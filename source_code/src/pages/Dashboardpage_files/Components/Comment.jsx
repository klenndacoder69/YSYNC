import React from 'react';
import './Post.css';

function Comment() {
    return (
        <div className="dashboard-comment">
            <div className="dashboard-comment-container">
                <div className="dashboard-comment-container-left">
                    <img src="profilePic" className="dashboard-comment-container-left-profile"/>
                </div>
                <div className="dashboard-comment-container-right">
                    <div className="dashboard-comment-container-right-bg">
                        <div className="dashboard-comment-container-right-name">
                        </div>
                        <div className="dashboard-comment-container-right-content">
                        </div>
                    </div>
                    <div>
                        Time | Date
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Comment;