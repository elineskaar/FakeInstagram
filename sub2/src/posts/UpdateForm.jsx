import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EmojiPicker from 'emoji-picker-react';

const API_URL = 'https://localhost:7106';

const UpdateForm = ({ onSubmit, onCancel, onNavigateToDelete }) => {
  const { postId } = useParams(); // Henter postId fra URL
  const [post, setPost] = useState(null);
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Hent post-data når komponenten lastes inn
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/PostAPI/${postId}`);
        if (!response.ok) {
          throw new Error('Post not found');
        }
        const data = await response.json();
        setPost(data);
        setCaption(data.PostText || ''); // Sett eksisterende tekst
        setImagePreview(data.ImageUrl || ''); // Sett eksisterende bilde-URL
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };
    fetchPostData();
  }, [postId]);

  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result); // Forhåndsvisning av bildet
      reader.readAsDataURL(file);
    }
  };

  const handleEmojiClick = (emojiObject) => {
    setCaption(caption + emojiObject.emoji); // Legg til emoji i teksten
    setShowEmojiPicker(false); // Lukk emoji-pickeren
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("PostText", caption);
    if (image) {
      formData.append("ImageFile", image);
    }
    onSubmit(formData);
  };

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div className="layoutform">
      <div className="card">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="caption">Update Caption ✍️</label>
            <div className="input-group">
              <input
                type="text"
                id="caption"
                className="form-control"
                value={caption}
                onChange={handleCaptionChange}
                placeholder="Update caption"
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                😊
              </button>
            </div>
          </div>

          {showEmojiPicker && (
            <div style={{ position: "absolute", zIndex: 10 }}>
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="image">Update Image 🖼️</label>
            <input
              type="file"
              id="image"
              className="form-control"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          {imagePreview && (
            <div style={{ marginTop: "10px" }}>
              <p>Image Preview:</p>
              <p>{imagePreview}</p>
              <img
                src={imagePreview}
                alt={imagePreview}
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
          )}

          <div className="button-group" style={{ marginTop: "20px" }}>
            <button type="submit" className="btn btn-outline-success">
              Update Post
            </button>
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={onNavigateToDelete}
            >
              Delete Post
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateForm;
