import React from 'react';
import './Pinned.css';
import pin from '/assets/pin.png';
import Post from "./Post";

function Pinned({ pinnedPosts, onPinToggle }) {
    return (
        <div className="pinnedContainer">
            <div className="pinnedHeader">
                <img src={pin} alt="pin-icon" className="icon" />
                Pinned Announcements
            </div>
           <div className="pinnedPost">
                {pinnedPosts.map((post, index) => (
                    <Post
                         key={index}
                        postId={post.postId}
                        initialLikes={post.initialLikes}
                        initialComments={post.initialComments}
                        onPinToggle={onPinToggle}
                        isPinned = {true}
                    />
                    ))}
             </div>
        </div>
    );
}

export default Pinned;