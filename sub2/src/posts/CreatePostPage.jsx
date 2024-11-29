import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateForm from './CreateForm'; 

const API_URL = 'https://localhost:7106';

const CreatePostPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handlePostCreation = async (formData) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/PostAPI/create`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      navigate('/posts'); // Redirect to posts list after creation
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="layoutform">
      <div className="card">
        <div className="card-header">Create Post</div>
        <div className="card-body">
          <CreateForm onSubmit={handlePostCreation} />
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;
