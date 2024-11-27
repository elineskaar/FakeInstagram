import React, {useState, useEffect} from 'react';
import ShowAllPage from './ShowAllPage';


const API_URL = 'https://localhost:7106';

const PostListPage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState (false);
    const [error, setError] = useState(null);

    const fetchPosts = async () => {
        setLoading(true);
        setError(null);

        try{
            const response = await fetch(`${API_URL}/api/PostAPI/postList`);
            if (!response.ok){
                throw new Error ('Network response was not ok');
            }
            const data = await response.json();
            setPosts(data);
            console.log(data);
        } catch (error){
            console.error(`There was a problem with the fetch operation: ${error.message}`);
            setError('Failed to fetch posts');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);
       
    
    return (
    <div>
        {error && <p style = {{color:'red'}}>{error}</p>}
        <ShowAllPage posts = {posts} apiUrl ={API_URL}/>
    </div>

    );
};

export default PostListPage;