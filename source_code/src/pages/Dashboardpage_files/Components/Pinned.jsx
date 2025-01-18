import React from 'react';
import './Pinned.css';
import pin from '/assets/pin.png';
import Post from "./Post";

function Pinned({ pinnedPosts, onPostsUpdate, onPinToggle, userId }) {
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
                         post={post}
                         userId={userId}
                          onPostsUpdate={onPostsUpdate}
                        //    onPinToggle={onPinToggle}
                    />
                    ))}
             </div>
        </div>
    );
}

export default Pinned;