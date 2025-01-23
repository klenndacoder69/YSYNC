import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import Upcoming from "./Components/Upcoming";
import Post from "./Components/Post";
import Pinned from "./Components/Pinned";
import Chat from "../../utilities/Chatbox";
import api from "../../api/axios";
import { jwtDecode } from "jwt-decode";
import Create from "./Components/Create";
import Createtriggered from "./Components/Createtriggered";
function Dashboard() {
  const [isCreating, setIsCreating] = useState(false);
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState("");
  const [userType, setUserType] = useState("");
  const handleCreateClick = () => {
    setIsCreating(true);
  };

  const handleCancelCreate = () => {
    setIsCreating(false);
  };


  const handlePinToggle = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, isPinned: !post.isPinned } : post
      )
    );
  };

  const pinnedPosts = posts.filter((post) => post.isPinned);
  console.log("pinnedposts:", pinnedPosts)

  const fetchPosts = async () => {
    
    try {
      const response = await api.get(`/getposts/${userId}`, {
        params: { userId },
      });
      console.log(response);
      setPosts(response.data.data || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    const decodedToken = jwtDecode(sessionStorage.getItem("accessToken"));
    console.log(decodedToken);
    setUserId(decodedToken.id);
    setUserType(decodedToken.userType);
    console.log("The user type is: ", userType);
  }, []);

  useEffect(() => {
    if (userId) {
      fetchPosts();
    }
  }, [userId]);

  const handlePostUpdate = async (updatedPosts) => {
    // Update the posts state
    setPosts(updatedPosts);

    // Re-fetch the posts to keep the data updated
    fetchPosts();
  };


  return (
    <div className="dashboard-main-wrapper">
      <div className="dashboard-main">
        <div className="dashboard-left-div">
          {pinnedPosts.length > 0 ? (
            <div className="dashboard-pinned-container">
              <Pinned
                userId={userId}
                pinnedPosts={pinnedPosts}
                onPostsUpdate={handlePostUpdate}
                // onPinToggle={handlePinToggle}
              />
            </div>
          ) : (
            <div className="dashboard-pinned-container">
              <h2 style={{ fontFamily: "Segoe UI", textAlign: "center", marginTop: "20px" }}>
                There are currently no pinned announcements.
              </h2>
            </div>
          )}
          {userType === "residentMember" ? (<div className="dashboard-create-container">
            {isCreating ? (
              <Createtriggered onCancel={handleCancelCreate} userId={userId} fetchPosts={fetchPosts} />
            ) : (
              <Create onCreateClick={handleCreateClick} />
            )}
            <br />
          </div>) : null}
          <div className="announcements-title">
            <h2>Announcements</h2>
          </div>
          <div className="dashboard-solution-container">
            <div className="dashboard-post-container">
              {posts.length === 0 ? (
                <h2 style={{ fontFamily: "Segoe UI", textAlign: "center", marginTop: "20px" }}>
                  There are currently no announcements.
                </h2>
              ) : (
                posts.map((post) => {
                  if (!post.isPinned && !post.isEvent) {
                    return (
                      <Post
                        key={post._id}
                        post={post}
                        userId={userId}
                        onPostsUpdate={handlePostUpdate}
                      />
                    );
                  }
                  return null;
                })
              )}
            </div>
          </div>
        </div>
        <div className="dashboard-right-div">
          <div className="dashboard-upcoming-container">
            <Upcoming posts={posts} />
          </div>
          <div className="dashboard-chatbox-container">
            <Chat/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
