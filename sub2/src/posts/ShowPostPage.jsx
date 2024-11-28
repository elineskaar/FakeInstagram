import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const API_URL = 'https://localhost:7106';

const ShowPostPage = () => {
  const { postId } = useParams();  // Henter postId fra URL
  const [post, setPost] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/PostAPI/${postId}`);
        if (!response.ok) {
          throw new Error('Post not found');
        }
        const data = await response.json();
        setPost(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching post data:', error);
        setLoading(false);
      }
    };
  
    fetchPostData();
  }, [postId]);  // Hent på nytt når postId endres

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment) return; // Legg ikke til tomme kommentarer

    const commentData = {
      PostId: postId,
      CommentText: newComment,
    };

    // Legg til kommentar
    fetch(`${API_URL}/api/PostAPI/comment/${postId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
    })
      .then((response) => response.json())
      .then((newCommentData) => {
        setPost((prevPost) => ({
          ...prevPost,
          Comments: [...prevPost.Comments, newCommentData],
        }));
        setNewComment('');
      })
      .catch((error) => {
        console.error('Feil ved legge til kommentar:', error);
      });
  };

  const handleLikePost = async () => {
    fetch(`${API_URL}/api/PostAPI/like/${postId}`, {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((likeData) => {
        setPost((prevPost) => ({
          ...prevPost,
          LikesCount: likeData.LikesCount  // Oppdater likesCount
        }));
      })
      .catch((error) => {
        console.error('Feil ved liking av post:', error);
      });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <div className="layoutpost">
      {post.ImageUrl && <img src={post.ImageUrl} alt="Post Image" />}
      <h4>{post.PostText}</h4>

      <button onClick={handleLikePost} className="btn btn-light">
        <i className="fas fa-heart" style={{ color: 'red', fontSize: '20px' }}></i> {post.LikesCount} Likes
      </button>

      {post.Comments.map((comment) => (
        <div key={comment.Id} className="commentbox">
          <strong>{comment.CommentText}</strong>
          {/* Her kan du fortsatt legge til knapper for sletting og oppdatering */}
        </div>
      ))}

      <div className="create" style={{ marginBottom: '20%' }}>
        <form onSubmit={handleAddComment}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="form-control"
            rows="3"
          />
          <button type="submit" className="btn btn-outline-success">
            Add Comment
          </button>
        </form>
        <button className="btn btn-outline-secondary" onClick={() => window.history.back()}>
          Back to post page
        </button>
      </div>
    </div>
  );
};

export default ShowPostPage;
