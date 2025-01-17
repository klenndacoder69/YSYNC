 import './Post.css';
// import profilePic from '/assets/profile.jpg';
import heartIcon from '/assets/heart.png';
import heartRedIcon from '/assets/heart-red.png';
// import pinIcon from '/assets/pin-2.png';
// import pinFilledIcon from '/assets/pin-filled.png';
import React, { useState, useEffect } from 'react';
import api from "../../../api/axios.js"

// function Post({ post, onPostUpdate, onPinToggle }) {

//     const handleLikeClick = () => {
//         const updatedLiked = !post.liked;
//         const updatedLikes = updatedLiked ? post.likes + 1 : post.likes - 1;
//         const updatedPost = { ...post, likes: updatedLikes, liked: updatedLiked };
//         onPostUpdate(updatedPost);
//     };

//     const handleSendClick = () => {
//         const updatedPost = {...post, comments: post.comments + 1}
//         onPostUpdate(updatedPost);
//     };

//    const handleCommentInputChange = (event) => {
//     const updatedPost = { ...post, commentInput: event.target.value}
//         onPostUpdate(updatedPost);
//    };

//     // const handlePinClick = () => {
//     //     onPinToggle(post.id);
//     // };


//     return (
//         <div className={`post-container${post.isPinned ? '-pinned' : ''}`}>
//             <div className="post-profile">
//                 <img src={profilePic} alt="profile pic" className="post-profile-pic"/>
//                 <div className="post-profile-info">
//                     <div className="post-profile-info-name">
//                         Placeholder
//                     </div>
//                     <div className="post-profile-info-datetime">
//                         January 16, 2025 | 12:00 PM
//                     </div>
//                 </div>
//             </div>
//             <div className="post-content">
//                 Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder
//                 Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder
//                 Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder
//             </div>
//             <div className="post-user">
//                 <div className='post-user-left'>
//                     <div className="post-user-like">
//                         <button onClick={handleLikeClick}>
//                             <img
//                                 src={post.liked ? heartRedIcon : heartIcon}
//                                 alt="Like Icon"
//                             />
//                         </button>
//                         {post.likes}
//                     </div>
//                     <div className="post-user-comment">
//                         <button>
//                             <img
//                                 src="/assets/chat-bubble.png"
//                                 alt="Comment Icon"
//                             />
//                         </button>
//                         {post.comments}
//                     </div>
//                      {/* <div className="post-user-pin">
//                         <button onClick={handlePinClick}>
//                             <img
//                                 src={post.isPinned ? pinFilledIcon : pinIcon}
//                                 alt="Pin Icon"
//                             />
//                         </button>
//                          Click To Pin
//                     </div> */}
//                 </div>
//                 <div className="post-user-right">
//                     <div className="post-user-comment-add">
//                         <input
//                           type="text"
//                            placeholder="Add a comment..."
//                             value={post.commentInput}
//                             onChange={handleCommentInputChange}
//                         />
//                     </div>
//                     <div className="post-user-comment-send">
//                         <button onClick={handleSendClick}>
//                             <img src="/assets/paper-plane.png" alt="send"/>
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

const Post = ({ post, userId, onPostsUpdate }) => {
    const [commentInput, setCommentInput] = useState('');
    const [liked, setLiked] = useState(post.hasReacted);
    const [likesCount, setLikesCount] = useState(post.hearts.length);

    const handleLikeClick = async () => {
        try {
            const response = await api.put(`/posts/${post._id}/heart`, { userId });
            setLiked(response.data.hearts.includes(userId));
            setLikesCount(response.data.hearts.length);
            const updatedPost = { ...post, hasReacted: response.data.hearts.includes(userId)};
            onPostUpdate(updatedPost);
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
            onPostsUpdate(response.data.data);
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
        </div>
    );
};

export default Post;
