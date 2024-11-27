import React from 'react';
import {Link} from 'react-router-dom';




const ShowAllPage = ({posts, apiUrl}) => {
    return(
<div className="text-center">
        <h1 className="display-4">Post Overview</h1>

    <div className="card mb-4">
            {posts.map((post)=> (
                <div className="row" key={post.Id}>
                    <img src = {`${apiUrl}${post.ImageUrl}`}></img>
                <div className="card-body">
                    <h5 className = "card-title">
                        {post.PostText}</h5>                       
                
                            <button type="submit" class="btn btn-light">
                            <h5>Likes</h5>
                            </button>
                        
                          
                            <Link to={`/posts/update/${post.Id}`} className="btn btn-outline-info">
  Update post
</Link>

                            <a class="btn btn-outline-info">Show comments</a>
                            
                        </div>
                        <hr />
                 </div>
            ))}
      
    </div>
</div>

    );
};

export default ShowAllPage;