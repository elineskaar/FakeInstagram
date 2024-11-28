import React from "react";
import { useNavigate } from "react-router-dom";
import PostForm from "./PostForm";

const API_URL = "https://localhost:7106";

const CreatePostPage = () => {
  const navigate = useNavigate();

  const handlePostCreate = async (formData) => {
    try {
      const response = await fetch(`${API_URL}/api/PostAPI/create`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error creating post");
      }

      console.log("Post created successfully");
      navigate("/posts"); // Naviger tilbake til posts-siden
    } catch (error) {
      console.error("There was an issue creating the post:", error);
    }
  };

  return (
    <div className="layoutform">
      <div className="card">
        <div className="card-header">Create a Post</div>
        <div className="card-body">
          <PostForm onSubmit={handlePostCreate} isUpdatePage={false} />
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;
