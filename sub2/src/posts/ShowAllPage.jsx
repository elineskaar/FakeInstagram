import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa"; 
import ScrollButton from "../components/ScrollButton";
import styles from './showall.css';

const ShowAllPage = ({ posts, apiUrl, onLike }) => {
  const [searchTerm, setSearchTerm] = useState("");

 
  const filteredPosts = posts.filter((post) =>
    post.PostText?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h1 style={{ textAlign: "center", marginTop: "3%" }}>Post Overview</h1>
      <div className="row">
        {/* Sidebar with Sticky Search Bar */}
        <div className="col-md-3">
          <div className="sticky-sidebar">
            <input
              type="text"
              className="form-control"
              placeholder="Search for posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-6" style={{ marginBottom: "15%" }}>
          {filteredPosts.map((post) => (
            <div className="card mb-4" key={post.Id}>
              {post.ImageUrl && (
                <img
                  src={`${apiUrl.replace(/\/$/, '')}${post.ImageUrl}`}
                  className="card-img-top"
                  alt="Post"
                />
              )}
              <div className="card-body">
                <h5 className="card-title" style={{ color: "rgb(29, 15, 15)" }}>
                  {post.PostText}
                  </h5>
                <button onClick={() => onLike(post.Id)} className="btn btn-light">
                  <i>
                    <FaHeart className="heart-icon" />
                  </i>{" "}
                  {post.LikesCount || 0} Likes
                </button>
                <hr />

                <Link to={`/posts/update/${post.Id}`} className="btn btn-outline-info">
                  Update post
                </Link>

                <Link to={`/posts/show/${post.Id}`} className="btn btn-outline-info" style={{ marginLeft: "2.5%" }}>
                  Show comments
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ScrollButton />
    </div>
  );
};

export default ShowAllPage;
