import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ShowPost = () => {
  const { postId } = useParams(); // Retrieve postId from the URL
  const [post, setPost] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch post data including comments and likes using fetch
    fetch(`/api/posts/${postId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Post not found');
        }
        return response.json();  // Convert response to JSON
      })
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('There was an error fetching the post data:', error);
        setLoading(false);
      });
  }, [postId]); // Re-fetch when postId changes

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment) return; // Don't add empty comments

    const commentData = {
      PostId: postId,
      CommentText: newComment,
    };

    // Use fetch to add a comment
    fetch(`/api/posts/${postId}/comments`, {
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
        console.error('Error adding comment:', error);
      });
  };

  const handleDeleteComment = (commentId) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;

    // Use fetch to delete a comment
    fetch(`/api/posts/${postId}/comments/${commentId}`, {
      method: 'DELETE',
    })
      .then(() => {
        setPost((prevPost) => ({
          ...prevPost,
          Comments: prevPost.Comments.filter((comment) => comment.Id !== commentId),
        }));
      })
      .catch((error) => {
        console.error('Error deleting comment:', error);
      });
  };

  const handleUpdateComment = (commentId, updatedText) => {
    // Use fetch to update a comment
    fetch(`/api/posts/${postId}/comments/${commentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ CommentText: updatedText }),
    })
      .then(() => {
        setPost((prevPost) => ({
          ...prevPost,
          Comments: prevPost.Comments.map((comment) =>
            comment.Id === commentId ? { ...comment, CommentText: updatedText } : comment
          ),
        }));
      })
      .catch((error) => {
        console.error('Error updating comment:', error);
      });
  };

  const handleLikePost = () => {
    fetch(`/api/posts/${postId}/likes`, {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((likeData) => {
        setPost((prevPost) => ({
          ...prevPost,
          Likes: likeData,
        }));
      })
      .catch((error) => {
        console.error('Error liking the post:', error);
      });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!post) {
    return <p>Post not found.</p>;
  }

  return (
    <div className="layoutpost">
      {post.ImageUrl && <img src={post.ImageUrl} alt="Post Image" />}
      <h4>{post.PostText}</h4>

      <button onClick={handleLikePost} className="btn btn-light">
        <i className="fas fa-heart" style={{ color: 'red', fontSize: '20px' }}></i> {post.Likes.length} Likes
      </button>

      {post.Comments.map((comment) => (
        <div key={comment.Id} className="commentbox">
          <strong>{comment.CommentText}</strong>
          <div className="buttonsedit">
            <button onClick={() => handleDeleteComment(comment.Id)} className="delete">
              <i className="fas fa-times" style={{ color: 'red' }}></i>
            </button>

            <button
              className="update btn btn-link"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#updateForm-${comment.Id}`}
              aria-expanded="false"
              aria-controls={`updateForm-${comment.Id}`}
            >
              <i className="fas fa-edit" style={{ color: 'rgb(43, 235, 33)' }}></i>
            </button>

            <div className="collapse mt-2" id={`updateForm-${comment.Id}`}>
              <div className="card card-body">
                <textarea
                  value={comment.CommentText}
                  onChange={(e) => handleUpdateComment(comment.Id, e.target.value)}
                  className="form-control"
                  rows="3"
                />
                <button type="button" onClick={() => handleUpdateComment(comment.Id, comment.CommentText)} className="btn btn-success mt-2">
                  Submit
                </button>
              </div>
            </div>
          </div>
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

export default ShowPost;
