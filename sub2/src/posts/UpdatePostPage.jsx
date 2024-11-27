import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const API_URL = 'https://localhost:7106';

const UpdatePostPage = () => {
  const [postText, setPostText] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);  // For image preview
  const navigate = useNavigate();
  const { postId } = useParams(); // Post ID from the URL params (for update)

  // Fetch post data if postId is available (for update)
  useEffect(() => {
    if (postId) {
      // Fetch post data for update
      fetch(`${API_URL}/api/PostAPI/${postId}`)
        .then((response) => response.json())
        .then((data) => {
          setPostText(data.postText); // Prepopulate text
          setImagePreview(data.imageUrl); // Prepopulate image preview
        })
        .catch((error) => console.error('Error fetching post data:', error));
    }
  }, [postId]);

  const handleFileChange = (event) => {
    setImageFile(event.target.files[0]);
    const previewUrl = URL.createObjectURL(event.target.files[0]);
    setImagePreview(previewUrl);  // Update preview on image change
  };

  const handleTextChange = (event) => {
    setPostText(event.target.value);
  };

  const handlePostUpdate = async () => {
    const formData = new FormData();
    formData.append('PostText', postText);
    if (imageFile) {
      formData.append('ImageFile', imageFile); // Attach new image if available
    }

    try {
      const response = await fetch(`${API_URL}/api/PostAPI/update/${postId}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error updating post');
      }

      const data = await response.json();
      console.log('Post updated successfully:', data);
      navigate('/posts'); // Redirect after update
    } catch (error) {
      console.error('There was an issue updating the post:', error);
    }
  };

  return (
    <div>
      <h2>{postId ? 'Update Post' : 'Create New Post'}</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>Post Text:</label>
          <input
            type="text"
            value={postText}
            onChange={handleTextChange}
            placeholder="Enter post text"
            required
          />
        </div>

        <div>
          <label>Upload Image:</label>
          <input type="file" onChange={handleFileChange} />
        </div>

        {/* Display existing image if available */}
        {imagePreview && !imageFile && (
          <div style={{ marginTop: '10px' }}>
            <p>Current Image:</p>
            <img
              src={imagePreview}
              alt="Current"
              style={{ width: '200px', height: '200px', objectFit: 'cover' }}
            />
          </div>
        )}

        {/* Display preview if user uploads a new image */}
        {imagePreview && imageFile && (
          <div style={{ marginTop: '10px' }}>
            <p>New Image Preview:</p>
            <img
              src={imagePreview}
              alt="Preview"
              style={{ width: '200px', height: '200px', objectFit: 'cover' }}
            />
          </div>
        )}

        <div>
          <button type="button" onClick={handlePostUpdate}>
            {postId ? 'Update Post' : 'Create Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePostPage;
