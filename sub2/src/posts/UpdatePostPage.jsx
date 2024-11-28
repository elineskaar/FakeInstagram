import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UpdateForm from './UpdateForm'; // Import the new UpdateForm component

const API_URL = 'https://localhost:7106';

const UpdatePostPage = () => {
  const [postText, setPostText] = useState('');
  const [existingImage, setExistingImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();  // Hook to navigate between pages
  const { postId } = useParams();

  useEffect(() => {
    if (postId) {
      setLoading(true);
      fetch(`${API_URL}/api/PostAPI/${postId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch post data');
          }
          return response.json();
        })
        .then((data) => {
          setPostText(data.postText);
          setExistingImage(data.imageUrl);
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [postId]);

  const handlePostUpdate = async (formData) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/PostAPI/update/${postId}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update post');
      }

      navigate('/posts');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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

        navigate('/posts'); // Redirect to posts list after delete
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleCancel = () => {
    navigate('/posts'); // Redirect to posts list without updating or deleting
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="layoutform">
      <div className="card">
        <div className="card-header">Update Post</div>
        <div className="card-body">
          <UpdateForm
            onSubmit={handlePostUpdate}
            existingText={postText}
            existingImage={existingImage}
            onDelete={handleDelete}  // Pass the delete handler
            onCancel={handleCancel}  // Pass the cancel handler
          />
        </div>
      </div>
    </div>
  );
};

export default UpdatePostPage;
