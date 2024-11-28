import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react"; // Use default export
import "./PostForm.css"; // Ensure you import the CSS file for styling

const CreateForm = ({ onSubmit }) => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();

      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleEmojiClick = (emojiObject) => {
    setCaption(caption + emojiObject.emoji);
    setShowEmojiPicker(false); // Close emoji picker after selection
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("PostText", caption);
    if (image) {
      formData.append("ImageFile", image);
    }
    onSubmit(formData); // Send the form data to parent
  };

  return (
    <div className="layoutform">
      {/* Card container for the form */}
      <div className="card">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="caption">Create Caption ✍️ (required):</label>
            <div className="input-group">
              <input
                type="text"
                id="caption"
                className="form-control"
                value={caption}
                onChange={handleCaptionChange}
                placeholder="Enter caption"
                required
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
            <label htmlFor="image">Upload Image 🖼️ (optional):</label>
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
              <img
                src={imagePreview}
                alt="Image Preview"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
          )}

          <div className="form-group">
            <button type="submit" className="btn btn-outline-success">
              Create Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateForm;
