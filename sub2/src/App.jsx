import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './home/HomePage';
import PostListPage from './posts/PostListPage';
import SideMenu from './shared/SideMenu';
import './styles/global.css';
import CreatePostPage from './posts/CreatePostPage';
import UpdatePostPage from './posts/UpdatePostPage';
import ShowPostPage from './posts/ShowPostPage';

const App = () => {
  return (
    <Router>
      <div className="grid-container">
        {/* Sidebar */}
        <SideMenu />

        {/* Main Content */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/posts" element={<PostListPage />} />
            <Route path="/posts/CreatePostPage" element={<CreatePostPage />} />
            <Route path="/posts/update/:postId" element={<UpdatePostPage />} />
            <Route path="/posts/show/:postId" element={<ShowPostPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        
    
      </div>
    </Router>
  );
}

export default App;
