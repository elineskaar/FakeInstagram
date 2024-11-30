import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaHeart } from "react-icons/fa6";
import EmojiPicker from "emoji-picker-react";
import { FaEdit, FaTrashAlt, FaSmile} from 'react-icons/fa';  // Importing icons from FA6
import './showpost.css';

const API_URL = 'https://localhost:7106';

const ShowPostPage = ({posts, apiUrl, onLike}) => {
  const { postId } = useParams();  // Henter postId fra URL
  const [post, setPost] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/PostAPI/${postId}`);
        if (!response.ok) {
          throw new Error('Post not found');
        }
        const data = await response.json();
        setPost(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching post data:', error);
        setLoading(false);
      }
    };
  
    fetchPostData();
  }, [postId]);  // Hent på nytt når postId endres

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment) return; // Legg ikke til tomme kommentarer
    if (!newComment.trim()) {
        alert("Comment cannot be empty");
        return;
      }

    const commentData = {
      PostId: 4,
      CommentText: newComment,
    };
    console.log('postId:', postId);
    console.log('commentData:', commentData);

    // Legg til kommentar
    fetch(`${API_URL}/api/PostAPI/comment/${postId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add comment');
        }
        return response.json(); // Returner alle kommentarer, ikke bare den nye
      })
      .then((updatedComments) => {
        setPost((prevPost) => ({
          ...prevPost,
          Comments: updatedComments,  // Oppdater kommentarliste med den fullstendige listen
        }));
        setNewComment('');
        setShowEmojiPicker(false); 
      })
      .catch((error) => {
        console.error('Feil ved legge til kommentar:', error);
      });
    
  };

  const handleLikePost = async () => {
    fetch(`${API_URL}/api/PostAPI/like/${postId}`, {
      method: 'POST',
    })
    .then((response) => response.json())
      .then((likeData) => {
        console.log('Server response',likeData);
        setPost((prevPost) => ({
          ...prevPost,
          LikesCount: likeData.LikesCount  // Oppdater likesCount
        }));
      })
  };

  const handleDeleteComment = (commentId) => {
    // Prompt user for confirmation before deleting
    const confirmDelete = window.confirm('Are you sure you want to delete this comment?');
    if (confirmDelete) {
      fetch(`${API_URL}/api/PostAPI/comment/${postId}/${commentId}`, {
        method: 'DELETE',
      })
        .then(() => {
          setPost((prevPost) => ({
            ...prevPost,
            Comments: prevPost.Comments.filter(comment => comment.Id !== commentId),
          }));
        })
        .catch((error) => {
          console.error('Feil ved sletting av kommentar:', error);
        });
    }
  };

  const handleEmojiClick = (emojiObject) => {
    setNewComment((prevComment) => prevComment + emojiObject.emoji);
    setShowEmojiPicker(false); // Close picker after selection
  };

  const handleUpdateComment = (commentId, updatedText) => {
    if (!updatedText) return; // Legg ikke til tomme kommentarer
    if (!updatedText.trim()) {
        alert("Comment cannot be empty");
        return;
      }

    const commentData = {
      Id: commentId,
      PostId: parseInt(postId, 10),
      CommentText: updatedText,
    };
    console.log('postId:', postId);
    console.log('commentId:', commentId);
    console.log('commentData:', commentData);
    fetch(`${API_URL}/api/PostAPI/comment/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
    })
      .then((response) => response.json())
      .then((updatedComment) => {
        setPost((prevPost) => ({
          ...prevPost,
          Comments: prevPost.Comments.map((comment) =>
            comment.Id === commentId ? updatedComment : comment
          ),
        }));
      })
      .catch((error) => {
        console.error('Feil ved oppdatering av kommentar:', error);
      });
  };
  
  
  

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <div className="layoutpost">
      {post.ImageUrl && <img src={post.ImageUrl} alt="Post Image" />}
      <h4>{post.PostText}</h4>

      <button onClick={handleLikePost} className="btn btn-light" style={{width: "25%", marginBottom:"3%", backgroundColor:""}}>
        <i><FaHeart className='heart-icon'  /></i> {''} {post.LikesCount || 0} Likes
      </button>

      {post.Comments && post.Comments.length > 0 ? (post.Comments.map((comment) => (
        <div key={comment.Id} className="commentbox">
          <strong>{comment.CommentText}</strong>
          {/* Delete and Update buttons */}
          <div className="buttonsedit">
            <button 
              className="delete" 
              onClick={() => handleDeleteComment(comment.Id)}>
              <FaTrashAlt style={{ color: "red", fontSize: "16px" }} />
            </button>
            <button 
              className="update btn btn-link" 
              onClick={() => {
                const updatedText = prompt("Edit your comment:", comment.CommentText);
                if (updatedText && updatedText.trim() !== "") {
                  handleUpdateComment(comment.Id, updatedText);
                }
              }}>
              <FaEdit style={{ color: "rgb(43, 235, 33)", fontSize: "16px" }} />
            </button>
          </div>
        </div>
      ))) : (
        <p>No comments yet</p>
      )}

<div className="create" style={{ marginBottom: '20%' }}>
        <form onSubmit={handleAddComment} style={{ position: 'relative' }}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="form-control"
            rows="3"
            placeholder="Write a comment..."
          />
          <button
            type="button"
            className="emoji-button"
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
            }}
          >
            <FaSmile style={{ fontSize: '20px', color: '#888' }} />
          </button>
          {showEmojiPicker && (
            <div className="emoji-picker-container" style={{ position: 'absolute', bottom: '50px', left: '0' }}>
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}

          <button type="submit" className="btn btn-outline-success" style={{margin: "2%"}}>
            Add Comment
          </button>
          <button className="btn btn-outline-secondary" onClick={() => window.history.back()}>
          Back to post page
        </button>
        </form>
      </div>
    </div>
  );
};

export default ShowPostPage;