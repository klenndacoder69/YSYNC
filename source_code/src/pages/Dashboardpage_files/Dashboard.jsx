import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import Upcoming from "./Components/Upcoming";
import Post from "./Components/Post";
import Chat from "../../utilities/Chatbox";
import api from "../../api/axios";
import { jwtDecode } from "jwt-decode";

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState("");

  const fetchPosts = async () => {
    const decodedToken = jwtDecode(sessionStorage.getItem("accessToken"));
    console.log(decodedToken);
    setUserId(decodedToken.id);
    console.log("The user id is: ", userId);
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

  const pinnedPosts = posts.filter((post) => post.isPinned);

  return (
    <div className="dashboard-main-wrapper">
      <div className="dashboard-main">
        <div className="dashboard-left-div">
          {pinnedPosts.length > 0 && (
            <div className="dashboard-pinned-container">
              {/* Pinned Posts Component */}
            </div>
          )}
          <div className="announcements-title">
            <h2>Announcements</h2>
          </div>
          <div className="dashboard-solution-container">
            <div className="dashboard-post-container">
              {posts.map((post) => {
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
              })}
            </div>
          </div>
        </div>
        <div className="dashboard-right-div">
          <div className="dashboard-upcoming-container">
            <Upcoming posts={posts} />
          </div>
        </div>
        <div className="dashboard-chatbox-container"></div>
      </div>
      <Chat />
    </div>
  );
}

export default Dashboard;
