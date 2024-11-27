import React, { useState } from 'react';

const PostForm = ({ onSubmit }) => {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Generer forhåndsvisning
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('PostText', caption);
    if (image) {
      formData.append('ImageFile', image);
    }
    onSubmit(formData); // Send dataene tilbake til CreatePostPage
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="caption">Caption:</label>
        <input
          type="text"
          id="caption"
          value={caption}
          onChange={handleCaptionChange}
          placeholder="Enter your caption"
          required
        />
      </div>

      <div>
        <label htmlFor="image">Upload Image:</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
      </div>

      {imagePreview && (
        <div style={{ marginTop: '10px' }}>
          <p>Image Preview:</p>
          <img
            src={imagePreview}
            alt="Image Preview"
            style={{ width: '200px', height: '200px', objectFit: 'cover' }}
          />
        </div>
      )}

      <div>
        <button type="submit">Create Post</button>
      </div>
    </form>
  );
};

export default PostForm;
