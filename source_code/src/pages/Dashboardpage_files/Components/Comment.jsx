import React from 'react';
import "./Comment.css"

function Comment() {
    return (
        <div className="comment-container">
            <div className="comment-profile-pic">
                <img src="/assets/profile.jpg" alt="profile" className="comment-profile-pic-img"/>
            </div>
            <div className="comment-content">
                <div className="comment-text">
                    <div className="comment-name">
                       Ana Lovelace
                    </div>
                    <div className="comment-body">
                        Placeholder placeholder placeholder placeholder placeholder placeholder placeholder
                    </div>
                </div>
                <div className="comment-time">
                    9:00 PM | January 17, 2025
                </div>
            </div>
        </div>
    );
}

export default Comment;