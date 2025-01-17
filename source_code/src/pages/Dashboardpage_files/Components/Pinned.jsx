import React from 'react';
import './Pinned.css';
import pin from '/assets/pin.png';
import Post from "./Post";

function Pinned({ pinnedPosts, onPostUpdate, onPinToggle }) {
    return (
        <div className="pinnedContainer">
            <div className="pinnedHeader">
                <img src={pin} alt="pin-icon" className="icon" />
                Pinned Announcements
            </div>
           <div className="pinnedPost">
                {pinnedPosts.map((post) => (
                    <Post
                         key={post.id}
                         post={post}
                          onPostUpdate={onPostUpdate}
                           onPinToggle={onPinToggle}
                    />
                    ))}
             </div>
        </div>
    );
}

export default Pinned;