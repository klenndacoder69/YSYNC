import './Post.css';
import heartIcon from '/assets/heart.png';
import heartRedIcon from '/assets/heart-red.png';
import React, { useState } from 'react';
import api from "../../../api/axios.js";
import Comment from "./Comment.jsx";

const Post = ({ post, userId, onPostsUpdate }) => {
  const [commentInput, setCommentInput] = useState('');
  const [liked, setLiked] = useState(post.hasReacted);
  const [likesCount, setLikesCount] = useState(post.hearts.length);

  const handleLikeClick = async () => {
    try {
      const response = await api.put(`/posts/${post._id}/heart`, { userId });
      setLiked(response.data.hearts.includes(userId));
      setLikesCount(response.data.hearts.length);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleCommentInputChange = (event) => {
    setCommentInput(event.target.value);
  };

  const handleSendClick = async () => {
    if (!commentInput.trim()) return;

    try {
      const response = await api.post(`/posts/${post._id}/comment`, {
        userId,
        text: commentInput.trim(),
      });

      setCommentInput('');
      console.log("Updated comments: ", response.data.data);
      onPostsUpdate(response.data.data);  // Update posts after adding a comment
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className={`post-container${post.isPinned ? '-pinned' : ''}`}>
      <div className="post-profile">
        <img src={post.userId.image} alt="profile pic" className="post-profile-pic" />
        <div className="post-profile-info">
          <div className="post-profile-info-name">{post.userId.firstName} {post.userId.lastName}</div>
          <div className="post-profile-info-datetime">
            {new Date(post.createdAt).toLocaleString()}
          </div>
        </div>
      </div>

      <div className="post-content">{post.content}</div>

      <div className="post-user">
        <div className="post-user-left">
          <div className="post-user-like">
            <button onClick={handleLikeClick}>
              <img
                src={liked ? heartRedIcon : heartIcon}
                alt="Like Icon"
              />
            </button>
            {likesCount}
          </div>
          <div className="post-user-comment">
            <button>
              <img
                src="/assets/chat-bubble.png"
                alt="Comment Icon"
              />
            </button>
            {post.comments.length}
          </div>
        </div>

        <div className="post-user-right">
          <div className="post-user-comment-add">
            <input
              type="text"
              placeholder="Add a comment..."
              value={commentInput}
              onChange={handleCommentInputChange}
            />
          </div>
          <div className="post-user-comment-send">
            <button onClick={handleSendClick}>
              <img src="/assets/paper-plane.png" alt="Send" />
            </button>
          </div>
        </div>
      </div>
      <div className="post-comment">
        {post.comments.map((comment) => {
          return (
            <Comment
            comment={comment}
              key={comment._id}
              user={comment.userId}
              text={comment.text}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Post;
