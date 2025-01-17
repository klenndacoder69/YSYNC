import React, { useState } from 'react';
import './Dashboard.css';
import Navbar from './Components/Navbar';
import Upcoming from "./Components/Upcoming";
import Pinned from "./Components/Pinned";
import Post from "./Components/Post";
import Create from "./Components/Create";
import Createtriggered from './Components/Createtriggered';

function Dashboard() {
    const [isCreating, setIsCreating] = useState(false);
    const [pinnedPosts, setPinnedPosts] = useState([]);

    const handleCreateClick = () => {
        setIsCreating(true);
    };

    const handleCancelCreate = () => {
        setIsCreating(false);
    };

    const handlePinToggle = (postId, isPinned, postData) => {
        if (isPinned) {
            setPinnedPosts((prevPosts) => [...prevPosts, postData]);
        } else {
            setPinnedPosts((prevPosts) => prevPosts.filter((post) => post.postId !== postId));
        }
    };


      const initialPosts = [
        { postId: 1, initialLikes: 0, initialComments: 0 },
        { postId: 2, initialLikes: 0, initialComments: 0 },
    ];



    return (
        <div className="dashboard-main">
            <Navbar />
            <div className="dashboard-left-div">
                <div className="dashboard-pinned-container">
                    <Pinned pinnedPosts={pinnedPosts} onPinToggle={handlePinToggle} />
                    <br/>
                </div>
                <div className="dashboard-create-container">
                    {isCreating ? (
                        <Createtriggered onCancel={handleCancelCreate} />
                    ) : (
                        <Create onCreateClick={handleCreateClick} />
                    )}
                    <br />
                </div>
                <div className="dashboard-solution-container">
                  <div className="dashboard-post-container">
                        {initialPosts.map((post) => (
                          <Post
                          key={post.postId}
                            postId={post.postId}
                            initialLikes={post.initialLikes}
                            initialComments={post.initialComments}
                          onPinToggle={handlePinToggle}
                            />
                          ))}
                  </div>
                </div>
            </div>
            <div className="dashboard-right-div">
                <div className="dashboard-upcoming-container">
                    <Upcoming />
                </div>
            </div>
            <div className="dashboard-chatbox-container">
            </div>
        </div>
    );
}

export default Dashboard;