import React from 'react';
import './Post.css';
import profilePic from '/assets/profile.jpg';
import heartIcon from '/assets/heart.png';
import heartRedIcon from '/assets/heart-red.png';
import pinIcon from '/assets/pin-2.png';
import pinFilledIcon from '/assets/pin-filled.png';
import Comment from "./Comment.jsx";

function Post({ post, onPostUpdate, onPinToggle }) {

    const handleLikeClick = () => {
        const updatedLiked = !post.liked;
        const updatedLikes = updatedLiked ? post.likes + 1 : post.likes - 1;
        const updatedPost = { ...post, likes: updatedLikes, liked: updatedLiked };
        onPostUpdate(updatedPost);
    };

    const handleSendClick = () => {
        const updatedPost = {...post, comments: post.comments + 1}
        onPostUpdate(updatedPost);
    };

   const handleCommentInputChange = (event) => {
    const updatedPost = { ...post, commentInput: event.target.value}
        onPostUpdate(updatedPost);
   };

    const handlePinClick = () => {
        onPinToggle(post.id);
    };


    return (
        <div className={`post-container${post.isPinned ? '-pinned' : ''}`}>
            <div className="post-profile">
                <img src={profilePic} alt="profile pic" className="post-profile-pic"/>
                <div className="post-profile-info">
                    <div className="post-profile-info-name">
                        Placeholder
                    </div>
                    <div className="post-profile-info-datetime">
                        January 16, 2025 | 12:00 PM
                    </div>
                </div>
            </div>
            <div className="post-content">
                Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder
                Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder
                Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder
            </div>
            <div className="post-user">
                <div className='post-user-left'>
                    <div className="post-user-like">
                        <button onClick={handleLikeClick}>
                            <img
                                src={post.liked ? heartRedIcon : heartIcon}
                                alt="Like Icon"
                            />
                        </button>
                        {post.likes}
                    </div>
                    <div className="post-user-comment">
                        <button>
                            <img
                                src="/assets/chat-bubble.png"
                                alt="Comment Icon"
                            />
                        </button>
                        {post.comments}
                    </div>
                     <div className="post-user-pin">
                        <button onClick={handlePinClick}>
                            <img
                                src={post.isPinned ? pinFilledIcon : pinIcon}
                                alt="Pin Icon"
                            />
                        </button>
                         Click To Pin
                    </div>
                </div>
                <div className="post-user-right">
                    <div className="post-user-comment-add">
                        <input
                          type="text"
                           placeholder="Add a comment..."
                            value={post.commentInput}
                            onChange={handleCommentInputChange}
                        />
                    </div>
                    <div className="post-user-comment-send">
                        <button onClick={handleSendClick}>
                            <img src="/assets/paper-plane.png" alt="send"/>
                        </button>
                    </div>
                </div>
            </div>
            <div className="post-comment">
                <Comment />
                <Comment />
            </div>
        </div>
    );
}

export default Post;