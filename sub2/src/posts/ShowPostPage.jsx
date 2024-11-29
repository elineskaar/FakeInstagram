import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaHeart } from "react-icons/fa6";
import { FaEdit, FaTrashAlt } from 'react-icons/fa';  // Importing icons from FA6
import './showpost.css';

const API_URL = 'https://localhost:7106';

const ShowPostPage = ({posts, apiUrl, onLike}) => {
  const { postId } = useParams();  // Henter postId fra URL
  const [post, setPost] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

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
        setNewComment(''); // Tøm kommentarfeltet
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
      fetch(`${API_URL}/api/PostAPI/comment/${commentId}`, {
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

  const handleUpdateComment = (commentId, updatedText) => {
    fetch(`${API_URL}/api/PostAPI/comment/${commentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ CommentText: updatedText }),
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

      <button onClick={handleLikePost} className="btn btn-light" style={{width: "27%", marginBottom:"3%", backgroundColor:""}}>
        <i><FaHeart style={{ color: "red", fontSize: "20px" }} /></i> {''} {post.LikesCount || 0} Likes
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
        <form onSubmit={handleAddComment}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="form-control"
            rows="3"
          />
          <button type="submit" className="btn btn-outline-success" style={{marginBottom: "3%"}}>
            Add Comment
          </button>
          <button className="btn btn-outline-secondary" style={{marginBottom: "3%"}} onClick={() => window.history.back()}>
          Back to post page
        </button>
        </form>
      </div>
    </div>
  );
};

export default ShowPostPage;
