import React from "react";
import { Link } from "react-router-dom";
import { FaHeart} from 'react-icons/fa6';

const ShowAllPage = ({ posts, apiUrl, onLike }) => {
  return (
    <div className="container mt-4">
      <h1 style={{ textAlign: "center", marginTop: "3%" }}>Post Overview</h1>
      <div className="row">
        {/* Venstre sideområde */}
        <div className="col-md-3">{/* Sidebar content here */}</div>

        {/* Midtre innholdsområde */}
        <div className="col-md-6" style={{ marginBottom: "15%" }}>
          {posts.map((post) => (
            <div className="card mb-4" key={post.Id}>
              {/* Viser bilde om det finnes */}
              {post.ImageUrl && (
                <img
                  src={`${apiUrl}${post.ImageUrl}`}
                  className="card-img-top"
                  alt="Post"
                />
              )}
              <div className="card-body">
                <h5
                  className="card-title"
                  style={{ color: "rgb(29, 15, 15)" }}
                >
                  {post.PostText}
                </h5>

                {/* Like-knapp */}
                <button
                  onClick={() => onLike(post.Id)}
                  className="btn btn-light"
                >
                  <i><FaHeart style={{ color: "red", fontSize: "20px" }}/>
                  </i>{" "}
                  {post.LikesCount || 0} Likes
                </button>
                <hr />

                {/* Oppdater-knapp */}
                <Link
                  to={`/posts/update/${post.Id}`}
                  className="btn btn-outline-info"
                >
                  Update post
                </Link>

                {/* Vis kommentarer-knapp */}
                <Link
                  to={`/posts/show/${post.Id}`}
                  className="btn btn-outline-info"
                >
                  Show comments
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Høyre sideområde */}
        <div className="col-md-3">
          <button id="backToTop" onClick={scrollToTop}>
            Back to Top
          </button>
        </div>
      </div>
    </div>
  );
};

// Scroll to top funksjon
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export default ShowAllPage;
