import React, { useState, useEffect } from 'react';
import ShowAllPage from './ShowAllPage';

const API_URL = 'https://localhost:7106';

const PostListPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/PostAPI/postList`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setPosts(data);
      console.log(data);
    } catch (error) {
      console.error(`There was a problem with the fetch operation: ${error.message}`);
      setError('Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLike = async (postId) => {
    try {
      // Send en POST-forespørsel til API-en for å legge til like
      const response = await fetch(`${API_URL}/api/PostAPI/like/${postId}`, {
        method: "POST",
      });
  
      if (response.ok) {
        // Hvis forespørselen er vellykket, oppdater lokalt antall likes
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.Id === postId ? { ...post, LikesCount: post.LikesCount + 1 } : post
          )
        );
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading && <p>Loading...</p>}
      <ShowAllPage posts={posts} apiUrl={API_URL} onLike={handleLike} />
    </div>
  );
};

export default PostListPage;
