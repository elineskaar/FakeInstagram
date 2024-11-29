import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UpdateForm from './UpdateForm';

const API_URL = 'https://localhost:7106';

const UpdatePostPage = () => {
  const [postText, setPostText] = useState('');
  const [existingImage, setExistingImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
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
          console.log('Fetched data:', data);  // Logg dataene for å verifisere
          setPostText(data.postText);  // Sett tekst
          setExistingImage(data.imageUrl ? `${API_URL}${data.imageUrl}` : null);  // Sett bilde-URL
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

  const handleNavigateToDelete = async () => {
    navigate(`/posts/delete/${postId}`);
  };

  const handleCancel = () => {
    navigate('/posts');
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
            onNavigateToDelete={handleNavigateToDelete}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </div>
  );
};

export default UpdatePostPage;
