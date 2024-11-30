import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Added useNavigate
import './showpost.css';

const API_URL = 'https://localhost:7106';

const DeletePage = () => {
  const { postId } = useParams(); // Retrieve postId from URL
  const navigate = useNavigate(); // For navigation
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPostData();
  }, [postId]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    if (confirmDelete) {
      try {
        const response = await fetch(`${API_URL}/api/PostAPI/delete/${postId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete post');
        }

        alert('Post deleted successfully!');
        navigate('/posts'); // Redirect to posts list after deletion
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleCancel = () => {
    navigate('/posts'); // Redirect to posts list without deleting
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="layoutpost">
      
        <div className="card-body">
          <h5>Are you sure you want to delete this post?</h5>
          {post && (
            <div>
              <h6>Post Preview:</h6>
              {post.ImageUrl && <img src={post.ImageUrl} alt="Post Preview" style={{ maxWidth: '100%' }} />}
              <p style={{marginLeft:"1%", fontSize:"20px"}}>{post.PostText}</p>
            </div>
          )}
          <div className="button-group" style={{ marginTop: '20px' }}>
            <button onClick={handleDelete} className="btn btn-outline-danger">
              Delete Post
            </button>
            <button onClick={handleCancel} className="btn btn-outline-secondary">
              Cancel
            </button>
          </div>
        </div>
    </div>
  );
};

export default DeletePage;
