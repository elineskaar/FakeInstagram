import React, { useState, useEffect } from "react";
import EmojiPicker from "emoji-picker-react"; // Import the default export from emoji-picker-react
import "./PostForm.css"; // Ensure you import the CSS file for styling

const UpdateForm = ({
  onSubmit,
  existingText = "",
  existingImage = null,
  onDelete,
  onCancel
}) => {
  const [caption, setCaption] = useState(existingText);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(existingImage);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Use effect to update state when existing data is passed (e.g., for update page)
  useEffect(() => {
    setCaption(existingText); // Populate initial data for update mode
    setImagePreview(existingImage); // Set preview for existing image on update
  }, [existingText, existingImage]);

  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();

      reader.onload = (e) => {
        setImagePreview(e.target.result); // Preview new image
      };

      reader.readAsDataURL(file);
    }
  };

  const handleEmojiClick = (emojiObject) => {
    setCaption(caption + emojiObject.emoji);
    setShowEmojiPicker(false); // Close emoji picker after selecting
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("PostText", caption);
    if (image) {
      formData.append("ImageFile", image); // Append the new image if present
    }
    onSubmit(formData); // Submit data to parent component
  };

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

          {/* Show the emoji picker when the user clicks the emoji button */}
          {showEmojiPicker && (
            <div style={{ position: "absolute", zIndex: 10 }}>
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="image">Update Image 🖼️ </label>
            <input
              type="file"
              id="image"
              className="form-control"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          {/* Show existing image preview when updating, or the new preview */}
          {imagePreview && (
            <div style={{ marginTop: "10px" }}>
              <p>New Image Preview:</p>
              <img
                src={imagePreview}
                alt="Image Preview"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
          )}

          {/* Show existing image if no new one is selected */}
          {!imagePreview && existingImage && (
            <div style={{ marginTop: "10px" }}>
              <p>Existing Image:</p>
              <img
                src={existingImage}
                alt="Existing Image"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
          )}

<div className="button-group">
            <button type="submit" className="btn btn-outline-success">
              Update Post
            </button>
          
          {/* Button group for Delete and Cancel */}
          
            <button onClick={onDelete} className="btn btn-outline-danger">
              Delete Post
            </button>
            <button onClick={onCancel} className="btn btn-outline-secondary">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateForm;
