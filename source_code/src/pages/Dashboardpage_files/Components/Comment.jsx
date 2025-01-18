import React from 'react';
import "./Comment.css"

function Comment({comment,user, text}) {
    console.log("comment: ", comment)
    console.log(user, text);
    return (
        <div className="comment-container">
            <div className="comment-profile-pic">
                <img src="/assets/profile.jpg" alt="profile" className="comment-profile-pic-img"/>
            </div>
            <div className="comment-content">
                <div className="comment-text">
                    <div className="comment-name">
                       {user.firstName} {user.middleName} {user.lastName}
                    </div>
                    <div className="comment-body">
                        {text}
                    </div>
                </div>
                <div className="comment-time">
                    6:48 PM | January 18, 2025
                </div>
            </div>
        </div>
    );
}

export default Comment;