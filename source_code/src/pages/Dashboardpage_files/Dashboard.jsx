import React, { useState } from "react";
import "./Dashboard.css";
import Upcoming from "./Components/Upcoming";
import Pinned from "./Components/Pinned";
import Post from "./Components/Post";
import Create from "./Components/Create";
import Createtriggered from "./Components/Createtriggered";

function Dashboard() {
  const [isCreating, setIsCreating] = useState(false);
  const [posts, setPosts] = useState([
    { id: 1, likes: 0, comments: 0, isPinned: false, liked: false },
    { id: 2, likes: 0, comments: 0, isPinned: false, liked: false },
    { id: 3, likes: 0, comments: 0, isPinned: false, liked: false },
    { id: 4, likes: 0, comments: 0, isPinned: false, liked: false },
    { id: 5, likes: 0, comments: 0, isPinned: false, liked: false },
    { id: 6, likes: 0, comments: 0, isPinned: false, liked: false },
  ]);

  const handleCreateClick = () => {
    setIsCreating(true);
  };

  const handleCancelCreate = () => {
    setIsCreating(false);
  };

  const handlePostUpdate = (updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
  };

  const handlePinToggle = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, isPinned: !post.isPinned } : post
      )
    );
  };

  const pinnedPosts = posts.filter((post) => post.isPinned);

  return (
    <div className="dashboard-main-wrapper">
      <div className="dashboard-main">
        <div className="dashboard-left-div">
          {pinnedPosts.length > 0 && (
            <div className="dashboard-pinned-container">
              <Pinned
                pinnedPosts={pinnedPosts}
                onPostUpdate={handlePostUpdate}
                onPinToggle={handlePinToggle}
              />
              <br />
            </div>
          )}
          <div className="dashboard-create-container">
            {isCreating ? (
              <Createtriggered onCancel={handleCancelCreate} />
            ) : (
              <Create onCreateClick={handleCreateClick} />
            )}
            <br />
          </div>
          <div className="announcements-title">
            {" "}
            <h2>Announcements</h2>{" "}
          </div>
          <div className="dashboard-solution-container">
            <div className="dashboard-post-container">
              {posts.map((post) => {
                if (!post.isPinned) {
                  return (
                    <Post
                      key={post.id}
                      post={post}
                      onPostUpdate={handlePostUpdate}
                      onPinToggle={handlePinToggle}
                    />
                  );
                }
              })}

            </div>
          </div>
        </div>
        <div className="dashboard-right-div">
          <div className="dashboard-upcoming-container">
            <Upcoming />
          </div>
        </div>
        <div className="dashboard-chatbox-container"></div>
      </div>
    </div>
  );
}

export default Dashboard;
