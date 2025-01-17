import React, { useState, useEffect } from 'react';
import './Post.css';
import profilePic from '/assets/profile.jpg';
import heartIcon from '/assets/heart.png';
import heartRedIcon from '/assets/heart-red.png';
import pinIcon from '/assets/pin-2.png';
import pinFilledIcon from '/assets/pin-filled.png';

function Post({ initialLikes = 0, initialComments = 0, postId, onPinToggle, isPinned }) {
    const [likes, setLikes] = useState(initialLikes);
    const [liked, setLiked] = useState(false);
    const [comments, setComments] = useState(initialComments);
    const [commentInput, setCommentInput] = useState('');
     const [pinned, setPinned] = useState(false);

    useEffect(() => {
    if (isPinned){
            setPinned(true)
        }
    }, [isPinned]);


    const handleLikeClick = () => {
        setLiked(!liked);
        if (liked) {
            setLikes(likes - 1);
        } else {
            setLikes(likes + 1);
        }
    };

    const handleSendClick = () => {
        setComments(comments + 1);
        setCommentInput('');
    };

    const handleCommentInputChange = (event) => {
        setCommentInput(event.target.value);
    };

    const handlePinClick = () => {
            setPinned(!pinned);
            onPinToggle(postId, !pinned, {postId, initialLikes, initialComments});
    };

    return (
        <div className="dashboard-post-container">
            <div className="dashboard-post-profile">
                <img src={profilePic} alt="profile pic" className="dashboard-post-profile-pic"/>
                <div className="dashboard-post-profile-info">
                    <div className="dashboard-post-profile-info-name">
                        Placeholder
                    </div>
                    <div className="dashboard-post-profile-info-datetime">
                        January 16, 2025 | 12:00 PM
                    </div>
                </div>
            </div>
            <div className="dashboard-post-content">
                Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder
                Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder
                Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder
            </div>
            <div className="dashboard-post-user">
                <div className='dashboard-post-user-left'>
                    <div className="dashboard-post-user-like">
                        <button onClick={handleLikeClick}>
                            <img
                                src={liked ? heartRedIcon : heartIcon}
                                alt="Like Icon"
                            />
                        </button>
                        {likes}
                    </div>
                    <div className="dashboard-post-user-comment">
                        <button>
                            <img
                                src="/assets/chat-bubble.png"
                                alt="Comment Icon"
                            />
                        </button>
                        {comments}
                    </div>
                     <div className="dashboard-post-user-pin">
                        <button onClick={handlePinClick}>
                            <img
                                src={pinned ? pinFilledIcon : pinIcon}
                                alt="Pin Icon"
                            />
                        </button>
                         Click To Pin
                    </div>
                </div>
                <div className="dashboard-post-user-right">
                    <div className="dashboard-post-user-comment-add">
                        <input
                          type="text"
                           placeholder="Add a comment..."
                            value={commentInput}
                            onChange={handleCommentInputChange}
                        />
                    </div>
                    <div className="dashboard-post-user-comment-send">
                        <button onClick={handleSendClick}>
                            <img src="/assets/paper-plane.png" alt="send"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;