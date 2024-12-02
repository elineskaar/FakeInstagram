import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./home/HomePage";
import PostListPage from "./posts/PostListPage";
import SideMenu from "./shared/SideMenu";
import CreatePostPage from "./posts/CreatePostPage";
import UpdatePostPage from "./posts/UpdatePostPage";
import ShowPostPage from "./posts/ShowPostPage";
import DeletePage from "./posts/DeletePage";
import ScrollButton from "./components/ScrollButton";
import "./styles/global.css";

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
            <Route path="/posts/delete/:postId" element={<DeletePage />} />
          </Routes>
        </main>
      </div>

      {/* Scroll-to-Top Button (Outside main-content) */}
      <ScrollButton />
    </Router>
  );
};

export default App;
