import React from 'react';
import { useNavigate } from 'react-router-dom';
import PostForm from './PostForm'; // Importer PostForm-komponenten

const API_URL = 'https://localhost:7106';

const CreatePostPage = () => {
  const navigate = useNavigate();

  const handlePostCreate = async (formData) => {
    try {
      const response = await fetch(`${API_URL}/api/PostAPI/create`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error creating post');
      }

      const data = await response.json();
      console.log('Post created successfully:', data);
      navigate('/posts'); // Naviger tilbake til posts-siden etter opprettelsen
    } catch (error) {
      console.error('There was an issue creating the post:', error);
    }
  };

  return (
    <div>
      <h2>Create New Post</h2>
      <PostForm onSubmit={handlePostCreate} /> {/* Bruk PostForm her */}
    </div>
  );
};

export default CreatePostPage;
