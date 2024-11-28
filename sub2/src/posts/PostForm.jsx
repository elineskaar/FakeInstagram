import React, { useState, useEffect } from "react";

const PostForm = ({ onSubmit, existingText = "", existingImage = null, isUpdatePage = false }) => {
  const [caption, setCaption] = useState(existingText);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(existingImage);

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
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="form-group">
        <label htmlFor="caption">
          {isUpdatePage ? "Update Caption ✍️" : "Create Caption ✍️"} (required):
        </label>
        <input
          type="text"
          id="caption"
          className="form-control"
          value={caption}
          onChange={handleCaptionChange}
          placeholder={isUpdatePage ? "Update caption" : "Enter caption"}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="image">
          {isUpdatePage ? "Update Image 🖼️" : "Upload Image 🖼️"} (optional):
        </label>
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
          <p>{isUpdatePage ? "New Image Preview:" : "Image Preview:"}</p>
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

      <div className="form-group">
        <button type="submit" className="btn btn-outline-success">
          {isUpdatePage ? "Update Post" : "Create Post"}
        </button>
      </div>
    </form>
  );
};

export default PostForm;
